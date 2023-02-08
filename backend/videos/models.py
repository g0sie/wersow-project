from django.db import models
from django.db.models.aggregates import Max
from random import randint
from pytube import YouTube


class VideoManager(models.Manager):
    def random(self):
        max_id = self.all().aggregate(max_id=Max("id"))["max_id"]
        if max_id:
            while True:
                pk = randint(1, max_id)
                video = self.filter(pk=pk).first()
                if video:
                    return video

    def todays(self):
        todays = self.filter(todays=True)
        if todays.count() > 0:
            return todays[0]

    def add_video(self, video_url: str):
        video = YouTube(video_url)
        return self.create(
            url=video_url,
            title=video.title,
            thumbnail_url=video.thumbnail_url,
            publish_date=video.publish_date.date(),
        )

    def change_todays_video(self):
        old_todays = self.filter(todays=True)

        for video in old_todays:
            video.todays = False
            video.save()

        new_todays = self.random()
        new_todays.todays = True
        new_todays.save()

        return new_todays


class Video(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    thumbnail_url = models.URLField()
    publish_date = models.DateField()
    todays = models.BooleanField(default=False)

    objects = VideoManager()

    def __str__(self):
        return self.title
