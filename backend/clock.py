from apscheduler.schedulers.blocking import BlockingScheduler

from videos.functions import add_latest_video
from videos.models import Video

sched = BlockingScheduler({"apscheduler.timezone": "Europe/Warsaw"})


@sched.scheduled_job("cron", hour=0, minute=0)
def scheduled_job():
    add_latest_video()
    Video.objects.change_todays_video()


sched.start()
