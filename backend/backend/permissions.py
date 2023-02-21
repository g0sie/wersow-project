from django.conf import settings
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsDebugTrueOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        is_debug_true = settings.DEBUG
        read_only = request.method in SAFE_METHODS
        return is_debug_true or read_only


class FrontendClientOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        origin = request.headers.get("Origin")
        is_frontend_client = origin == "https://wersow.netlify.app"
        read_only = request.method in SAFE_METHODS
        return is_frontend_client or read_only
