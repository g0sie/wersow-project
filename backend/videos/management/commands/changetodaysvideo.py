from django.core.management.base import BaseCommand

from videos.models import Video


class Command(BaseCommand):
    help = "Changes today's video to another random video"

    def handle(self, *args, **options):

        todays = Video.objects.filter(todays=True)
        for v in todays:
            v.todays = False
            v.save()

        random = Video.objects.random()
        random.todays = True
        random.save()

        self.stdout.write(self.style.SUCCESS(
            f"Now today's video is: {random}"))
