"""
Django admin customization.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


class UserAdmin(BaseUserAdmin):
    """define the admin pages for users."""

    ordering = ["id"]
    list_display = ["username", "email", "is_superuser"]


admin.site.register(User, UserAdmin)
