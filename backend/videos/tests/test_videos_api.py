"""
Tests for videos API.
"""
import datetime

from rest_framework.test import APITestCase
from rest_framework import status

from django.urls import reverse

from videos.models import Video
from videos.serializers import VideoSerializer


TODAYS_URL = reverse("videos:todays")

VIDEO_EXAMPLE = {
    "title": "POZNALIŚMY PŁEĆ NASZEGO DZIECKA!",
    "url": "https://www.youtube.com/watch?v=Obbi-NZu7IA",
    "thumbnail_url": "https://i.ytimg.com/vi/Obbi-NZu7IA/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSMFXYUVNWXxmDADt2R8T8JLo6iQ",
    "publish_date": datetime.date(2023, 3, 7),
}


def create_video(**params):
    """Helper function to create a video."""
    video = Video.objects.create(
        title=params.pop("title", VIDEO_EXAMPLE["title"]),
        url=params.pop("url", VIDEO_EXAMPLE["url"]),
        thumbnail_url=params.pop("thumbnail_url", VIDEO_EXAMPLE["thumbnail_url"]),
        publish_date=params.pop("publish_date", VIDEO_EXAMPLE["publish_date"]),
        **params
    )
    return video


class PublicVideosAPITests(APITestCase):
    """Test unauthenticated API requests."""

    def test_todays_video_works(self):
        """Test today's video endpoint."""
        todays_video = create_video(todays=True)

        res = self.client.get(TODAYS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        serializer = VideoSerializer(todays_video)
        self.assertEqual(res.data, serializer.data)

    def test_todays_video_error_when_no_todays_video(self):
        """Test today's video endpoint sets a random video as today's
        when there are no today's videos in database."""
        video = create_video(todays=False)

        res = self.client.get(TODAYS_URL)

        video.refresh_from_db()
        self.assertTrue(video.todays)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        serializer = VideoSerializer(video)
        self.assertEqual(res.data, serializer.data)

    def test_todays_video_error_when_no_videos(self):
        """Test today's video endpoint responses with an error
        when there are no videos at all in database."""
        res = self.client.get(TODAYS_URL)

        self.assertEqual(res.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)

    def test_todays_video_when_multiple_todays_videos(self):
        """Test today's video endpoint responses with the latest today's video
        when there are multiple today's video in database."""
        video = create_video(publish_date=datetime.date(2023, 2, 14), todays=True)
        latest_video = create_video(
            publish_date=datetime.date(2023, 2, 16), todays=True
        )

        res = self.client.get(TODAYS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        latest_video.refresh_from_db()
        serializer = VideoSerializer(latest_video)
        self.assertEqual(res.data, serializer.data)
