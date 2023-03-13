"""
Tests for videos utils.
"""
from django.test import TestCase

from videos.utils import WersowChannel


class TestWersowChannel(TestCase):
    """Tests for WersowChannel."""

    def test_channel_initialize_successful(self):
        """Test Wersow's channel initialize successful."""
        wersow_channel = WersowChannel()

        self.assertEqual(wersow_channel.channel.channel_name, "WERSOW")

    def test_video_urls_not_empty(self):
        """Test that video_urls list is not empty."""
        channel = WersowChannel()
        video_urls = channel.get_video_urls()

        self.assertNotEqual(video_urls, [])
