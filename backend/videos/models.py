from django.db import models


class Video(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    thumbnail_url = models.URLField()
    publish_date = models.DateField()

    def __str__(self):
        return self.title
