"""
Utils for videos.
"""
from pytube import Channel


class WersowChannel:
    """Wersow's channel."""

    def __init__(self):
        self.channel = Channel(
            "https://www.youtube.com/channel/UCtVy1X-hcxAL2ZlS6TqMQFw"
        )

    def video_urls(self) -> str:
        return self.channel.video_urls[0]

    def get_latest_video_url(self) -> str:
        return self.channel.video_urls[0]
