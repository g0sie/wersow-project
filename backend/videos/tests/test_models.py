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


def create_video(**params):
    """Helper function for creating a video."""
    video = Video.objects.create(
        title=params.pop("title", VIDEO_EXAMPLE["title"]),
        url=params.pop("url", VIDEO_EXAMPLE["url"]),
        thumbnail_url=params.pop("thumbnail_url", VIDEO_EXAMPLE["thumbnail_url"]),
        publish_date=params.pop("publish_date", VIDEO_EXAMPLE["publish_date"]),
        **params
    )
    return video


class VideoModelTests(TestCase):
    """Tests for Video model."""

    def test_create_video(self):
        """Test creating a video is successful."""
        video = create_video(**VIDEO_EXAMPLE)

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
        video = create_video(**video_data)

        self.assertFalse(video.todays)

    def test_random_video(self):
        """Test random video works."""
        video = create_video()

        random_video = Video.objects.random()

        self.assertEqual(video, random_video)

    def test_random_video_returns_none_when_no_videos(self):
        """Test that random video returns None if there is no videos in database."""
        random_video = Video.objects.random()

        self.assertIsNone(random_video)
