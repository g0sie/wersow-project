from django.db import models
from django.db.models.aggregates import Max
from random import randint


class VideoManager(models.Manager):
    def random(self):
        max_id = self.all().aggregate(max_id=Max("id"))['max_id']
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


class Video(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    thumbnail_url = models.URLField()
    publish_date = models.DateField()
    todays = models.BooleanField(default=False)

    objects = VideoManager()

    def __str__(self):
        return self.title
