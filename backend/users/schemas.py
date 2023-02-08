from drf_yasg import openapi
from .serializers import UserSerializer

# Parameteres
id_parameter = openapi.Schema(type=openapi.TYPE_INTEGER)
name_parameter = openapi.Schema(type=openapi.TYPE_STRING)
email_parameter = openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL)
password_parameter = openapi.Schema(
    type=openapi.TYPE_STRING,
    format=openapi.FORMAT_PASSWORD,
)
url_parameter = openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_URI)
date_parameter = openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE)
boolean_parameter = openapi.Schema(type=openapi.TYPE_BOOLEAN)

# Schemas
login_schema = openapi.Schema(
    "User",
    type=openapi.TYPE_OBJECT,
    properties={"email": email_parameter, "password": password_parameter},
    required=["email", "password"],
)

jwt_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={"jwt": openapi.Schema(type=openapi.TYPE_STRING)},
)

user_schema = openapi.Schema(
    "User",
    type=openapi.TYPE_OBJECT,
    properties={"id": id_parameter, "name": name_parameter, "email": email_parameter},
)
user_id_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT, properties={"video_id": id_parameter}
)
collected_video_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "video_id": id_parameter,
        "title": name_parameter,
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
register_response = openapi.Response("User created", user_schema)
login_response = openapi.Response("User logged in", jwt_schema)
user_response = openapi.Response("Authenticated", user_schema)
videos_response = openapi.Response("Collected videos", collected_videos_schema)
collect_video_response = openapi.Response("Video added", user_video_schema)
