from django.conf import settings
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsDebugTrueOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return settings.DEBUG or request.method in SAFE_METHODS
