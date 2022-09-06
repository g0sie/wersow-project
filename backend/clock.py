from apscheduler.schedulers.blocking import BlockingScheduler
import os

sched = BlockingScheduler({'apscheduler.timezone': 'Europe/Warsaw'})


@sched.scheduled_job('cron', hour=0, minute=0)
def scheduled_job():
    os.system('python manage.py changetodaysvideo')


sched.start()
