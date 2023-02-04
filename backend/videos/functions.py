from videos.models import Video


def change_todays_video():
    old_todays = Video.objects.filter(todays=True)

    for video in old_todays:
        video.todays = False
        video.save()

    new_todays = Video.objects.random()
    new_todays.todays = True
    new_todays.save()

    return new_todays
