from django.urls import path

from videos import views

app_name = "videos"
urlpatterns = [
    path("todays/", views.TodaysVideo.as_view(), name="todays"),
    path("my-videos", views.MyVideos.as_view(), name="my-videos"),
    path("my-videos/add", views.CollectVideo.as_view(), name="collect-video"),
]
