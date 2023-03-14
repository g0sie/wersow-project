"""
Tests for commands.
"""
from unittest.mock import patch

from django.core.management import call_command
from django.test import TestCase

from videos.models import Video

EXAMPLE_URLS = [
    "https://www.youtube.com/watch?v=cRwx3UZMjSI",
    "https://www.youtube.com/watch?v=8oYBwypAndE",
]


class VideoCommandsTests(TestCase):
    """Tests for commands."""

    @patch("videos.utils.WersowChannel.get_video_url_by")
    def test_loadvideos_works(self, patched_video_url_by):
        """Test loadvideos adds Wersow's videos to database."""
        patched_video_url_by.side_effect = EXAMPLE_URLS + [IndexError]
        call_command("loadvideos")

        added_count = Video.objects.all().count()
        self.assertEqual(added_count, len(EXAMPLE_URLS))

    @patch("videos.utils.WersowChannel.get_video_url_by")
    def test_loadvideos_limit_works(self, patched_video_url_by):
        """Test that limit argument in loadvideos commands works."""
        patched_video_url_by.side_effect = EXAMPLE_URLS + [IndexError]
        limit = 1
        call_command("loadvideos", limit=limit)

        added_count = Video.objects.all().count()
        self.assertEqual(added_count, limit)

    @patch("videos.utils.WersowChannel.get_video_url_by")
    def test_loadvideos_doesnt_add_duplicates(self, patched_video_url_by):
        """Test loadvideos adds only new videos."""
        Video.objects.add_video(EXAMPLE_URLS[0])

        patched_video_url_by.side_effect = EXAMPLE_URLS + [IndexError]
        call_command("loadvideos")

        count = Video.objects.all().count()
        self.assertEqual(count, len(EXAMPLE_URLS))

    @patch("videos.models.Video.objects.change_todays_video")
    def test_changetodaysvideo_calls_change_todays_video(self, change_todays_video):
        """Test changetodaysvideo calls change_todays_video method."""
        call_command("changetodaysvideo")

        change_todays_video.assert_called_once()

    @patch("videos.models.Video.objects.add_latest_video")
    def test_addlatestvideo_calls_add_latest_video(self, add_latest_video):
        """Test addlatestvideo calls add_latest_video method."""
        call_command("addlatestvideo")

        add_latest_video.assert_called_once()
