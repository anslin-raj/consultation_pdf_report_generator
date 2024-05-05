from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/user/", include("api_auth.urls")),
    path("api/v1/consultation_report/", include("consultation_report.urls")),
]
