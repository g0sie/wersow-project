"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from argparse import Namespace
from django.contrib import admin
from django.urls import path, include

from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view

schema_view = swagger_get_schema_view(
    openapi.Info(
        title="Wersow API",
        default_version='1.0.0',
        description="API documentation of Wersow App"
    ),
    public=True,
    permission_classes=[DjangoModelPermissionsOrAnonReadOnly]
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include([
        path('videos/', include(('videos.urls'), namespace='videos')),
        path('swagger/schema/', schema_view.with_ui('swagger',
             cache_timeout=0), name='swagger-schema')
    ])),
]
