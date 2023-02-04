from django.core.management.base import BaseCommand
from pytube import Channel, YouTube

from videos.models import Video


class Command(BaseCommand):
    help = "Adds Wersow's videos to the database"

    def add_arguments(self, parser):
        parser.add_argument(
            "--limit", type=int, help="Amount of videos to add", default=float("inf")
        )

    def handle(self, *args, **options):
        channel = Channel("https://www.youtube.com/channel/UCtVy1X-hcxAL2ZlS6TqMQFw")

        limit = options.get("limit")
        added = 0
        added_all = True

        for video_url in channel.video_urls:
            if added >= limit:
                added_all = False
                break

            is_video_new = Video.objects.filter(url=video_url).count() < 1
            if is_video_new:
                yt = YouTube(video_url)
                Video.objects.create(
                    url=video_url,
                    title=yt.title,
                    thumbnail_url=yt.thumbnail_url,
                    publish_date=yt.publish_date.date(),
                )
                added += 1

        self.stdout.write(self.style.SUCCESS(f"Added {added} new videos"))

        if added_all:
            self.stdout.write(
                self.style.SUCCESS("All Wersow's videos are in the database")
            )
