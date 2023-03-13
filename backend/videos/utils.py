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

    def get_video_urls(self) -> List[str]:
        """Return list of channel's video urls."""
        return self.channel.video_urls

    # def get_latest_video_url(self) -> str:
    #     return self.channel.video_urls[0]
