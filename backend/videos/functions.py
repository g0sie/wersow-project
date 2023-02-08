from pytube import YouTube, Channel
from videos.models import Video


def change_todays_video():
    old_todays = Video.objects.filter(todays=True)

    for video in old_todays:
        video.todays = False
        video.save()

    new_todays = Video.objects.random()
    new_todays.todays = True
    new_todays.save()

    return new_todays


def add_latest_video():
    channel = Channel("https://www.youtube.com/channel/UCtVy1X-hcxAL2ZlS6TqMQFw")
    video_url = channel.video_urls[0]

    is_video_new = Video.objects.filter(url=video_url).count() == 0
    if is_video_new:
        Video.objects.add_video(video_url)
