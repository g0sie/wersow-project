import jwt
import datetime

from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema

from .serializers import UserSerializer
from .models import User, VideoCollection
from . import schemas
from videos.models import Video
from videos.serializers import VideoSerializer
from videos.schemas import videos_schema


@swagger_auto_schema(
    method="POST",
    operation_summary="Register a new user",
    request_body=UserSerializer,
    responses={201: schemas.register_response, 400: "Invalid request data"},
)
@api_view(["POST"])
def register(request):

    if request.method == "POST":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method="POST",
    operation_summary="Log in a user",
    operation_description="Generate a jwt token and set it as a cookie in response",
    request_body=schemas.login_schema,
    responses={403: "Incorrect data", 200: schemas.login_response},
)
@api_view(["POST"])
def login(request):

    if request.method == "POST":
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response("User not found", status=status.HTTP_403_FORBIDDEN)

        if not user.check_password(password):
            return Response("Incorrect password", status=status.HTTP_403_FORBIDDEN)

        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256").decode(
            "utf-8"
        )

        response = Response("User logged in", status=status.HTTP_200_OK)
        response.set_cookie(
            key="jwt", value=token, httponly=True, samesite="None", secure=True
        )
        response.data = {"jwt": token}

        return response


@swagger_auto_schema(
    method="GET",
    operation_summary="Get an authenticated user",
    operation_description="Return a user from a given jwt cookie",
    responses={403: "Unauthenticated", 200: schemas.user_response},
)
@api_view(["GET"])
def user(request):

    if request.method == "GET":
        token = request.COOKIES.get("jwt")

        if not token:
            raise AuthenticationFailed("Unauthenticated")

        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithm=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated")

        user = User.objects.filter(id=payload["id"]).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)


@swagger_auto_schema(
    method="POST",
    operation_summary="Log out a user",
    operation_description="Delete a jwt token cookie",
    responses={204: "User logged out"},
)
@api_view(["POST"])
def logout(request):

    if request.method == "POST":
        response = Response()
        response.delete_cookie("jwt", samesite="None")
        response.status_code = status.HTTP_204_NO_CONTENT
        return response


@swagger_auto_schema(
    method="GET",
    operation_summary="Get user's video collection",
    responses={200: videos_schema, 404: "Not found"},
)
@swagger_auto_schema(
    method="POST",
    operation_summary="Add a video to user's collection",
    request_body=schemas.user_id_schema,
    responses={201: schemas.collect_video_response, 404: "User not found"},
)
@api_view(["GET", "POST"])
def videos(request, user_id: int):
    user = User.objects.filter(id=user_id).first()

    # get user's video collection
    if request.method == "GET":
        if user is None:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        collection = VideoCollection.objects.filter(user=user).select_related("video")
        videos = [user_video.video for user_video in collection]

        serializer = VideoSerializer(videos, many=True)
        return Response({"videos": serializer.data})

    # add a video to user's collection
    if request.method == "POST":
        if user is None:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        video_id = request.data.get("video_id")
        video = Video.objects.filter(id=video_id).first()
        if video is None:
            return Response("Video not found", status=status.HTTP_404_NOT_FOUND)

        user.videos.add(video)
        return Response(
            {"user_id": user_id, "video_id": video_id}, status=status.HTTP_201_CREATED
        )
