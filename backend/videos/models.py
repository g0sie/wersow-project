from django.db import models
from django.db.models.aggregates import Count
from random import randint


class GetRandomVideoManager(models.Manager):
    def get_queryset(self):
        count = self.all().count()
        random_index = randint(0, count - 1)
        video = self.all()[random_index]
        return video


class Video(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    thumbnail_url = models.URLField()
    publish_date = models.DateField()

    random = GetRandomVideoManager()

    def __str__(self):
        return self.title
