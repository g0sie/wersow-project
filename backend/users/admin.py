"""
Django admin for users.
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from users import models


class UserAdmin(admin.ModelAdmin):
    """Define the admin pages for users."""

    ordering = ["-date_joined"]
    list_display = ["username", "email", "date_joined"]
    fieldsets = (
        (
            None,
            {
                "fields": ("username", "email", "password"),
            },
        ),
        (_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser")}),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    readonly_fields = ["last_login", "date_joined"]


admin.site.register(models.User, UserAdmin)
