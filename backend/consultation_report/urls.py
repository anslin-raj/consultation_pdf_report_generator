from django.urls import path
from .views import (
    report_list_create,
    report_detail,
    generate_report_pdf,
    dashboard_statistics,
)

urlpatterns = [
    path("reports/", report_list_create, name="report-list-create"),
    path("reports/<uuid:pk>/", report_detail, name="report-detail"),
    path("generate/pdf/<uuid:uuid>/", generate_report_pdf, name="generate-pdf"),
    path("statistics/", dashboard_statistics, name="statistics"),
]
