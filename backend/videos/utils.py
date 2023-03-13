"""
Utils for videos.
"""
from pytube import Channel
from typing import List


class WersowChannel:
    """Wersow's channel."""

    def __init__(self):
        self.channel = Channel(
            "https://www.youtube.com/channel/UCtVy1X-hcxAL2ZlS6TqMQFw"
        )
        self.video_urls = None

    def get_video_urls(self) -> List[str]:
        """Return list of channel's video urls."""
        if self.video_urls is None:
            self.video_urls = self.channel.video_urls

        return self.video_urls

    def get_video_url_by(self, index: int) -> str:
        """Return video url by index from video_urls."""
        urls = self.get_video_urls()
        return urls[index]

    def get_latest_video_url(self) -> str:
        """Return url of the latest Wersow's video."""
        return self.get_video_url_by(index=0)
