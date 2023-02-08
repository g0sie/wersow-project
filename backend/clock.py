from apscheduler.schedulers.blocking import BlockingScheduler

from videos.functions import change_todays_video, add_latest_video

sched = BlockingScheduler({"apscheduler.timezone": "Europe/Warsaw"})


@sched.scheduled_job("cron", hour=0, minute=0)
def scheduled_job():
    add_latest_video()
    change_todays_video()


sched.start()
