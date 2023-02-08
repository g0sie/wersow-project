from apscheduler.schedulers.blocking import BlockingScheduler

import django

django.setup()
from videos.models import Video

sched = BlockingScheduler({"apscheduler.timezone": "Europe/Warsaw"})


@sched.scheduled_job("cron", hour=0, minute=0)
def scheduled_job():
    # Video.objects.add_latest_video() <- it doesn't work because pytube is broken
    Video.objects.change_todays_video()


sched.start()
