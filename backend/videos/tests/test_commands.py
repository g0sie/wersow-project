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
    "https://www.youtube.com/watch?v=Obbi-NZu7IA",
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
        """Test loadvideos adds Wersow's videos to database."""
        patched_video_url_by.side_effect = EXAMPLE_URLS + [IndexError]
        limit = 2
        call_command("loadvideos", limit=limit)

        added_count = Video.objects.all().count()
        self.assertEqual(added_count, limit)

    @patch("videos.utils.WersowChannel.get_video_url_by")
    def test_loadvideos_doesnt_add_duplicates(self, patched_video_url_by):
        """Test loadvideos adds Wersow's videos to database."""
        Video.objects.add_video(EXAMPLE_URLS[1])

        patched_video_url_by.side_effect = EXAMPLE_URLS + [IndexError]
        call_command("loadvideos")

        count = Video.objects.all().count()
        self.assertEqual(count, len(EXAMPLE_URLS))
