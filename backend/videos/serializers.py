from rest_framework import serializers
from rest_framework.fields import empty

from .models import Video, UserVideoRelation


class VideoSerializer(serializers.ModelSerializer):
    """Serializer for Video model."""

    class Meta:
        model = Video
        fields = "__all__"


class CollectedVideoSerializer(serializers.ModelSerializer):
    """Serializer for collected videos."""

    video = VideoSerializer()

    class Meta:
        model = UserVideoRelation
        fields = ("collected", "video")
