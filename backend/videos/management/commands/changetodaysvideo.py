from django.core.management.base import BaseCommand

from videos.functions import change_todays_video


class Command(BaseCommand):
    help = "Changes today's video to another random video"

    def handle(self, *args, **options):

        new_todays = change_todays_video()

        self.stdout.write(self.style.SUCCESS(f"Now today's video is: {new_todays}"))
