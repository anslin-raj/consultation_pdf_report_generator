from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import user_registration, delete_user, list_users, user_details

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", user_registration, name="user-registration"),
    path("all/", list_users, name="list-users"),
    path("delete/<int:pk>/", delete_user, name="delete-user"),
    path("", user_details, name="user_details"),
]
