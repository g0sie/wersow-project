"""
Tests for videos utils.
"""
from django.test import TestCase

from videos.utils import WersowChannel


class TestWersowChannel(TestCase):
    """Tests for WersowChannel."""

    def setUp(self):
        self.channel = WersowChannel()

    def test_channel_initialize_successful(self):
        """Test Wersow's channel initialize successful."""
        channel_pytube = self.channel.channel

        self.assertEqual(channel_pytube.channel_name, "WERSOW")

    def test_video_urls_not_empty(self):
        """Test that video_urls list is not empty."""
        video_urls = self.channel.get_video_urls()

        is_empty = len(video_urls) == 0
        self.assertFalse(is_empty)

    def test_get_latest_video_url_works(self):
        """Test get_latest_video_url returns url."""
        url = self.channel.get_latest_video_url()

        self.assertIn("https://www.youtube.com", url)
