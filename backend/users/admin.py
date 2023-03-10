"""
Django admin for users.
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from users import models


class UserAdmin(admin.ModelAdmin):
    """Define the admin pages for users."""

    ordering = ["-date_joined"]
    list_display = ["username", "email", "date_joined"]


admin.site.register(models.User, UserAdmin)
