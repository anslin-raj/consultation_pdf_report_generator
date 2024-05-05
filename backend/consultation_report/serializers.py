from rest_framework import serializers
from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            "id",
            "title",
            "clinic_name",
            "physician_name",
            "physician_contact",
            "patient_first_name",
            "patient_last_name",
            "patient_dob",
            "patient_contact",
            "chief_complaint",
            "consultation_notes",
            "logo",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
