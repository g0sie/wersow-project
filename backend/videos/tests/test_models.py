"""
Tests for Video model.
"""
import datetime

from django.test import TestCase

from videos.models import Video

VIDEO_EXAMPLE = {
    "title": "POZNALIŚMY PŁEĆ NASZEGO DZIECKA!",
    "url": "https://www.youtube.com/watch?v=Obbi-NZu7IA",
    "thumbnail_url": "https://i.ytimg.com/vi/Obbi-NZu7IA/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSMFXYUVNWXxmDADt2R8T8JLo6iQ",
    "publish_date": datetime.date(2023, 3, 7),
    "todays": True,
}


class VideoModelTests(TestCase):
    """Tests for Video model."""

    def test_create_video(self):
        """Test creating a video is successful."""
        video = Video.objects.create(**VIDEO_EXAMPLE)

        self.assertEqual(str(video), VIDEO_EXAMPLE["title"])
        self.assertEqual(video.title, VIDEO_EXAMPLE["title"])
        self.assertEqual(video.url, VIDEO_EXAMPLE["url"])
        self.assertEqual(video.thumbnail_url, VIDEO_EXAMPLE["thumbnail_url"])
        self.assertEqual(video.publish_date, VIDEO_EXAMPLE["publish_date"])
        self.assertEqual(video.todays, VIDEO_EXAMPLE["todays"])

    def test_video_is_not_todays_default(self):
        """Test video is not todays by default."""
        video_data = {**VIDEO_EXAMPLE}
        video_data.pop("todays")
        video = Video.objects.create(**video_data)

        self.assertFalse(video.todays)
