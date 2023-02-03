from drf_yasg import openapi
from .serializers import UserSerializer


email_schema = openapi.Parameter(
    "email", openapi.IN_BODY, type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL
)
password_schema = openapi.Parameter(
    "password",
    openapi.IN_BODY,
    type=openapi.TYPE_STRING,
    format=openapi.FORMAT_PASSWORD,
)
login_schema = openapi.Schema(
    "User",
    type=openapi.TYPE_OBJECT,
    properties={"email": email_schema, "password": password_schema},
    required=["email", "password"],
)

jwt_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={"jwt": openapi.Schema("jwt", type=openapi.TYPE_STRING)},
)

register_response = openapi.Response("User created", UserSerializer)
login_response = openapi.Response("User logged in", jwt_schema)
