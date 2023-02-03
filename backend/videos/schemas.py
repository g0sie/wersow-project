from drf_yasg import openapi
from .serializers import VideoSerializer

# Parameteres
id_parameter = openapi.Schema(type=openapi.TYPE_INTEGER)
title_parameter = openapi.Schema(type=openapi.TYPE_STRING)
url_parameter = openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI)
thumbnail_url_parameter = openapi.Schema(
    type=openapi.TYPE_STRING, format=openapi.FORMAT_URI
)
publish_date_parameter = openapi.Schema(
    type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE
)
todays_parameter = openapi.Schema(type=openapi.TYPE_BOOLEAN)


# Schemas
video_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": id_parameter,
        "title": title_parameter,
        "url": url_parameter,
        "thumbnail_url": thumbnail_url_parameter,
        "publish_date": publish_date_parameter,
        "todays": todays_parameter,
    },
)

videos_schema = openapi.Schema(
    "Videos",
    type=openapi.TYPE_ARRAY,
    items=video_schema,
)

# Responses
post_video_response = openapi.Response("Video created", video_schema)
