"""
Django admin for videos.
"""

from django.contrib import admin
from django.contrib.auth import get_user_model

from videos.models import Video, UserVideoRelation


class VideoAdmin(admin.ModelAdmin):
    """Define Video in django-admin."""

    ordering = ["-todays", "-publish_date"]
    search_fields = ["title", "publish_date"]
    list_display = ["title", "publish_date", "todays"]


class UserVideoRelationAdmin(admin.ModelAdmin):
    """Define UserVideoRelation in django-admin."""

    ordering = ["-collected"]
    list_display = ["user", "video", "collected"]


admin.site.register(Video, VideoAdmin)
admin.site.register(UserVideoRelation, UserVideoRelationAdmin)
