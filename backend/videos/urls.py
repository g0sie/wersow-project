from django.urls import path

from . import views

app_name = 'videos'
urlpatterns = [
    path('', views.videos_list, name='list'),
    path('<int:id>', views.video_details, name='details'),
    path('random', views.random_video, name='random'),
]
