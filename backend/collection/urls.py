from django.urls import path

from . import views

urlpatterns = [
    path("<int:user_id>/videos", views.videos),
    path("<int:user_id>/videos/<int:video_id>", views.video),
    path("<int:user_id>/videos/count", views.count_videos),
]
