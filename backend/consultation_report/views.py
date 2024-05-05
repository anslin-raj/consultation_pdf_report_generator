from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count, Value
from django.db.models.functions import Concat, TruncDay

from .models import Report
from .serializers import ReportSerializer
from .utils import get_report_by_id, generate_pdf


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def report_list_create(request):
    if request.method == "GET":
        reports = Report.objects.filter(user=request.user)
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def report_detail(request, pk):
    try:
        report = Report.objects.get(pk=pk)
    except Report.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if report.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    if request.method == "GET":
        serializer = ReportSerializer(report)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ReportSerializer(report, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def generate_report_pdf(request, uuid):
    report = get_report_by_id(uuid)
    if not report:
        return HttpResponse("Report not found", status=404)

    pdf = generate_pdf(report)
    print(report)
    response = HttpResponse(pdf, content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="report.pdf"'
    return response


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def dashboard_statistics(request):
    current_user = request.user
    today = timezone.now().date()
    seven_days_ago = today - timedelta(days=7)

    total_reports = Report.objects.count()
    unique_physicians = Report.objects.values("physician_name").distinct().count()
    unique_patients = (
        Report.objects.annotate(
            full_name=Concat("patient_first_name", Value(" "), "patient_last_name")
        )
        .values("full_name")
        .distinct()
        .count()
    )
    unique_clinics = Report.objects.values("clinic_name").distinct().count()

    last_user_report = (
        Report.objects.filter(user=current_user).order_by("-created_at").first()
    )

    reports_last_7_days = (
        Report.objects.filter(
            created_at__date__gte=seven_days_ago, created_at__date__lte=today
        )
        .annotate(date=TruncDay("created_at"))
        .values("date")
        .annotate(count=Count("id"))
        .order_by("-date")
    )

    report_counts_by_date = [
        {"date": report["date"].strftime("%Y-%m-%d"), "count": report["count"]}
        for report in reports_last_7_days
    ]

    response_data = {
        "reportCount": total_reports,
        "physicianCount": unique_physicians,
        "patientCount": unique_patients,
        "clinicCount": unique_clinics,
        "lastReport": last_user_report.title if last_user_report else "No reports",
        "reportCountsLast7Days": report_counts_by_date,
        "lastReportCreatedAt": (
            last_user_report.created_at.strftime("%Y-%m-%d %H:%M:%S")
            if last_user_report
            else "No reports created"
        ),
    }

    most_common_complaint = (
        Report.objects.values("chief_complaint")
        .annotate(count=Count("id"))
        .order_by("-count")
        .first()
    )

    if most_common_complaint:
        response_data["mostCommonComplaint"] = most_common_complaint

    return JsonResponse(response_data)
