from django.urls import path

from videos import views

app_name = "videos"
urlpatterns = [
    path("todays/", views.TodaysVideo.as_view(), name="todays"),
]
