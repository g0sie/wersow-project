from django.core.management.base import BaseCommand
from pytube import Channel, YouTube

from videos.models import Video


class Command(BaseCommand):
    help = "Adds Wersow's videos to the database"

    def add_arguments(self, parser):
        parser.add_argument(
            '--limit', type=int, help='Amount of videos to add', default=float('inf')
        )

    def handle(self, *args, **options):
        channel = Channel(
            'https://www.youtube.com/channel/UCtVy1X-hcxAL2ZlS6TqMQFw/videos')

        limit = options.get('limit')
        added = 0
        i = 0

        while True:
            if added < limit:
                try:
                    video_url = channel.video_urls[i]
                    # don't add videos that are already in the database
                    if Video.objects.filter(url=video_url).count() < 1:
                        yt = YouTube(video_url)
                        Video.objects.create(
                            url=video_url,
                            title=yt.title,
                            thumbnail_url=yt.thumbnail_url,
                            publish_date=yt.publish_date.date()
                        )
                        added += 1
                    i += 1
                except IndexError:
                    self.stdout.write(self.style.SUCCESS(
                        "All Wersow's videos are in the database"))
                    break
            else:
                break

        self.stdout.write(self.style.SUCCESS(f"Added {added} new videos"))
