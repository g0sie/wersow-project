from django.db import models
from django.db.models.aggregates import Max
from random import randint


class GetRandomVideoManager(models.Manager):
    def get_queryset(self):
        max_id = Video.objects.all().aggregate(max_id=Max("id"))['max_id']
        while True:
            pk = randint(1, max_id)
            video = Video.objects.filter(pk=pk).first()
            if video:
                return video


class Video(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    thumbnail_url = models.URLField()
    publish_date = models.DateField()

    random = GetRandomVideoManager()
    objects = models.Manager()

    def __str__(self):
        return self.title
