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
