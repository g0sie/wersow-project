"""
Tests for Video model.
"""
import datetime

from unittest.mock import patch, MagicMock

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
        """Test random method works."""
        video = create_video()

        random_video = Video.objects.random()

        self.assertEqual(video, random_video)

    def test_random_video_returns_none_when_no_videos(self):
        """Test that random method returns None if there are no videos in database."""
        random_video = Video.objects.random()

        self.assertIsNone(random_video)

    def test_todays_video_works(self):
        """Test todays method returns today's video."""
        video = create_video(todays=True)

        todays_video = Video.objects.todays()

        self.assertEqual(todays_video, video)

    def test_todays_video_returns_none_when_no_videos(self):
        """Test that todays method returns None if there are no videos in database."""
        todays_video = Video.objects.todays()

        self.assertIsNone(todays_video)

    def test_todays_video_when_multiple_todays_videos(self):
        """Test that todays method returns latest video
        when there are multiple today's videos."""
        old = create_video(publish_date=datetime.date(2022, 5, 22), todays=True)
        latest = create_video(publish_date=datetime.date(2023, 3, 7), todays=True)

        todays_video = Video.objects.todays()

        self.assertEqual(todays_video, latest)

    def test_add_video_works(self):
        """Test add_video method works."""
        video_url = VIDEO_EXAMPLE["url"]
        video = Video.objects.add_video(video_url=video_url)

        exists = Video.objects.filter(title=VIDEO_EXAMPLE["title"]).exists()
        self.assertTrue(exists)

    @patch("videos.models.Video.objects.random")
    def test_change_todays_video_works(self, patched_random):
        """Test change_todays_video method changes today's video."""
        old_todays = create_video(todays=True)
        next_todays = create_video(todays=False)

        patched_random.return_value = next_todays
        Video.objects.change_todays_video()

        old_todays.refresh_from_db()
        self.assertFalse(old_todays.todays)
        next_todays.refresh_from_db()
        self.assertTrue(next_todays.todays)

    def test_change_todays_video_when_no_todays_videos(self):
        """Test change_todays_video sets today's video when there is no today's video."""
        video = create_video(todays=False)

        Video.objects.change_todays_video()

        video.refresh_from_db()
        self.assertTrue(video.todays)

    @patch("videos.models.Video.objects.random")
    def test_change_todays_video_when_multiple_todays_videos(self, patched_random):
        """Test that change_todays_video leaves database with only one today's video
        even if there were more today's videos before."""
        old_todays1 = create_video(todays=True)
        old_todays2 = create_video(todays=True)
        next_todays = create_video(todays=False)

        patched_random.return_value = next_todays
        Video.objects.change_todays_video()

        self.assertTrue(next_todays.todays)
        todays_count = Video.objects.filter(todays=True).count()
        self.assertEqual(todays_count, 1)

    @patch("videos.utils.WersowChannel.get_latest_video_url")
    def test_add_latest_video_works(self, patched_latest):
        """Test add_latest_video method adds latest Wersow's video to database."""
        url = VIDEO_EXAMPLE["url"]
        patched_latest.return_value = url
        Video.objects.add_latest_video()

        is_added = Video.objects.filter(url=url).exists()
        self.assertTrue(is_added)

    @patch("videos.utils.WersowChannel.get_latest_video_url")
    def test_add_latest_video_when_latest_isnt_new(
        self,
        patched_latest_video_url,
    ):
        """Test add_latest_video doens't add latest Wersow's video
        if it's already in database."""
        url = VIDEO_EXAMPLE["url"]
        create_video(url=url)

        patched_latest_video_url.return_value = url
        Video.objects.add_latest_video()

        is_added = Video.objects.filter(url=url).count() > 1
        self.assertFalse(is_added)
