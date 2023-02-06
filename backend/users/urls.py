from django.urls import path

from users import views

urlpatterns = [
    path("register", views.register),
    path("login", views.login),
    path("user", views.user),
    path("logout", views.logout),
    path("<int:user_id>/videos", views.videos),
]
