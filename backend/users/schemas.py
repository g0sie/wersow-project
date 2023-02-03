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

# Responses
register_response = openapi.Response("User created", user_schema)
login_response = openapi.Response("User logged in", jwt_schema)
user_response = openapi.Response("Authenticated", user_schema)
