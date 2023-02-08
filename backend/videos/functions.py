from pytube import YouTube, Channel
from videos.models import Video


def add_latest_video():
    channel = Channel("https://www.youtube.com/channel/UCtVy1X-hcxAL2ZlS6TqMQFw")
    video_url = channel.video_urls[0]

    is_video_new = Video.objects.filter(url=video_url).count() == 0
    if is_video_new:
        Video.objects.add_video(video_url)
