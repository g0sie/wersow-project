# Generated by Django 4.1 on 2023-02-08 16:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("videos", "0003_video_todays"),
        ("users", "0003_user_videos"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="videos",
        ),
        migrations.CreateModel(
            name="VideoCollection",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("collected", models.DateField(auto_now_add=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="collection",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "video",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="collection",
                        to="videos.video",
                    ),
                ),
            ],
        ),
    ]
