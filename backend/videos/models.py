"""
Models for videos API.
"""
from random import randint
from pytube import YouTube

from django.db import models
from django.db.models.aggregates import Max

from videos.utils import WersowChannel


class VideoManager(models.Manager):
    """Manager for videos."""

    def random(self):
        """Return a random video or None if there are no videos."""
        max_id = self.all().aggregate(max_id=Max("id"))["max_id"]
        if max_id:
            while True:
                pk = randint(1, max_id)
                video = self.filter(pk=pk).first()
                if video:
                    return video

    def todays(self):
        """Return latest today's video or None if there is no today's video."""
        todays = self.filter(todays=True).order_by("-publish_date")
        if todays.count() > 0:
            return todays[0]

    def add_video(self, video_url: str):
        """Add a video from url."""
        if type(video_url) != str:
            raise TypeError(f"{video_url} is not a string")

        video = YouTube(video_url)
        return self.create(
            url=video_url,
            title=video.title,
            thumbnail_url=video.thumbnail_url,
            publish_date=video.publish_date.date(),
        )

    def change_todays_video(self):
        """Change today's video to another one."""
        old_todays = self.filter(todays=True)

        for video in old_todays:
            video.todays = False
            video.save()

        new_todays = self.random()
        new_todays.todays = True
        new_todays.save()

        return new_todays

    def add_latest_video(self):
        """If Wersow published a new video - add it to database."""
        channel = WersowChannel()
        video_url = channel.get_latest_video_url()

        is_video_new = self.filter(url=video_url).count() == 0
        if is_video_new:
            return self.add_video(video_url)


class Video(models.Model):
    """Video in database."""

    title = models.CharField(max_length=100)
    url = models.URLField()
    thumbnail_url = models.URLField()
    publish_date = models.DateField()
    todays = models.BooleanField(default=False)

    objects = VideoManager()

    def __str__(self):
        return self.title
