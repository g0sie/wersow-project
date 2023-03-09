import datetime

from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

from .serializers import UserSerializer
from videos.serializers import VideoSerializer

from .models import User, VideoCollection
from videos.models import Video


@api_view(["POST"])
def register(request):
    if request.method == "POST":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(["POST"])
def logout(request):
    if request.method == "POST":
        response = Response()
        response.delete_cookie("jwt", samesite="None")
        response.status_code = status.HTTP_204_NO_CONTENT
        return response


@api_view(["GET", "POST"])
def videos(request, user_id: int):
    user = User.objects.filter(id=user_id).first()

    if request.method == "GET":
        """get user's video collection"""
        if user is None:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        collection = VideoCollection.objects.filter(user=user).select_related("video")
        videos = []
        for user_video in collection:
            video = VideoSerializer(user_video.video).data
            video["collected"] = user_video.collected
            videos.append(video)

        return Response({"videos": videos})

    if request.method == "POST":
        """add a video to user's collection"""
        if user is None:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        video_id = request.data.get("video_id")
        video = Video.objects.filter(id=video_id).first()
        if video is None:
            return Response("Video not found", status=status.HTTP_404_NOT_FOUND)

        user_video = VideoCollection.objects.filter(user=user, video=video).first()
        if user_video:
            return Response(
                "Video already collected",
                status=status.HTTP_403_FORBIDDEN,
            )

        user_video = VideoCollection.objects.create(user=user, video=video)
        return Response(
            {
                "user_id": user_id,
                "video_id": video_id,
                "collected": user_video.collected,
            },
            status=status.HTTP_201_CREATED,
        )


@api_view(["GET"])
def video(request, user_id: int, video_id: int):
    """get a video from user's collection"""

    if request.method == "GET":
        user = User.objects.filter(id=user_id).first()
        if user is None:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        video = Video.objects.filter(id=video_id).first()
        if video is None:
            return Response("Video not found", status=status.HTTP_404_NOT_FOUND)

        user_video = VideoCollection.objects.filter(user=user, video=video).first()
        if user_video is None:
            return Response("Video not collected", status=status.HTTP_404_NOT_FOUND)

        video = VideoSerializer(user_video.video).data
        video["collected"] = user_video.collected

        return Response(video)
