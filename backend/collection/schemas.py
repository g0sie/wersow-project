from drf_yasg import openapi

# Parameteres
id_parameter = openapi.Schema(type=openapi.TYPE_INTEGER)
title_parameter = openapi.Schema(type=openapi.TYPE_STRING)
url_parameter = openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI)
date_parameter = openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE)
boolean_parameter = openapi.Schema(type=openapi.TYPE_BOOLEAN)

# Schemas
user_id_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT, properties={"video_id": id_parameter}
)
collected_video_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "video_id": id_parameter,
        "title": title_parameter,
        "url": url_parameter,
        "thumbnail_url": url_parameter,
        "publish_date": date_parameter,
        "todays": boolean_parameter,
        "collected": date_parameter,
    },
)
collected_videos_schema = openapi.Schema(
    type=openapi.TYPE_ARRAY, items=collected_video_schema
)
user_video_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "user_id": id_parameter,
        "video_id": id_parameter,
        "collected": date_parameter,
    },
)

# Responses
videos_response = openapi.Response("Collected videos", collected_videos_schema)
collect_video_response = openapi.Response("Video added", user_video_schema)
