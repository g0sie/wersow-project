from django.db import models

from videos.models import Video
from users.models import User


class VideoCollection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="collection")
    video = models.ForeignKey(
        Video, on_delete=models.CASCADE, related_name="collection"
    )
    collected = models.DateField(auto_now_add=True)
