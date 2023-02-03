from django.contrib import admin
from django.urls import path, include

from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view

schema_view = swagger_get_schema_view(
    openapi.Info(
        title="wersow-project API",
        default_version="1.0.0",
        description="API documentation of wersow-project",
    ),
    public=True,
    permission_classes=[DjangoModelPermissionsOrAnonReadOnly],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="swagger-schema",
    ),
    path("users/", include("users.urls")),
    path("videos/", include("videos.urls")),
]
