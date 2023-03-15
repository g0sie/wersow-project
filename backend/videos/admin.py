"""
Django admin for videos.
"""

from django.contrib import admin

from videos.models import Video


class VideoAdmin(admin.ModelAdmin):
    """Define Video in django-admin."""

    ordering = ["-todays", "-publish_date"]
    search_fields = ["title", "publish_date"]
    list_display = ["title", "publish_date", "todays"]


admin.site.register(Video, VideoAdmin)
