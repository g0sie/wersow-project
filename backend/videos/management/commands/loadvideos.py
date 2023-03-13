from django.core.management.base import BaseCommand

from videos.models import Video
from videos.utils import WersowChannel


class Command(BaseCommand):
    help = "Adds Wersow's videos to the database"

    def add_arguments(self, parser):
        """Specify how many videos should be added (all by default)."""
        parser.add_argument(
            "--limit", type=int, help="Amount of videos to add", default=float("inf")
        )

    def handle(self, *args, **options):
        """Iterate over Wersow's videos and add them to the database."""

        channel = WersowChannel()
        to_add_limit = options.get("limit")
        added_count = 0
        added_all = False

        def should_add_more() -> bool:
            return added_count < to_add_limit

        def is_video_new(url: str) -> bool:
            return not Video.objects.filter(url=url).exists()

        i = 0
        while should_add_more():
            try:
                url = channel.get_video_url_by(index=i)
            except IndexError:
                added_all = True
                break

            if is_video_new(url):
                Video.objects.add_video(url)
                added_count += 1

        self.stdout.write(self.style.SUCCESS(f"Added {added_count} new videos"))

        if added_all:
            self.stdout.write(
                self.style.SUCCESS("All Wersow's videos are in the database")
            )
