from django.contrib.auth.models import User
from django.db import models
import uuid


class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reports")
    clinic_name = models.CharField(max_length=255, null=False, blank=False)
    physician_name = models.CharField(max_length=255, null=False, blank=False)
    physician_contact = models.EmailField(null=False, blank=False)
    patient_first_name = models.CharField(max_length=255, null=False, blank=False)
    patient_last_name = models.CharField(max_length=255, null=True, blank=True)
    patient_dob = models.DateField(null=False, blank=False)
    patient_contact = models.EmailField(null=True, blank=True)
    chief_complaint = models.TextField(null=False, blank=False)
    consultation_notes = models.TextField(null=False, blank=False)
    logo = models.ImageField(upload_to="logos", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)

    def __str__(self):
        return self.title
