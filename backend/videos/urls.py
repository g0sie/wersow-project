from django.urls import path

from . import views

app_name = 'videos'
urlpatterns = [
    path('<int:id>', views.video_details, name='details'),
    path('', views.videos_list, name='list'),
]
