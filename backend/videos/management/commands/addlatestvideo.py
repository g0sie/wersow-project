from django.core.management.base import BaseCommand

from videos.models import Video


class Command(BaseCommand):
    help = "Checks for the latest Wersow's video and adds it to database if it's new"

    def handle(self, *args, **options):

        latest_video = Video.objects.add_latest_video()

        if latest_video:
            self.stdout.write(self.style.SUCCESS(f"Added: {latest_video}"))

        else:
            self.stdout.write(self.style.SUCCESS("Latest video is already in database"))
