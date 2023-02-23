from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema
from . import schemas

from .models import VideoCollection
from users.models import User
from videos.models import Video

from videos.serializers import VideoSerializer


@swagger_auto_schema(
    method="GET",
    operation_summary="Get user's video collection",
    responses={200: schemas.videos_response, 404: "Not found"},
)
@swagger_auto_schema(
    method="POST",
    operation_summary="Add a video to user's collection",
    request_body=schemas.user_id_schema,
    responses={
        201: schemas.collect_video_response,
        403: "Video already collected",
        404: "User not found",
    },
)
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


@swagger_auto_schema(
    method="GET",
    operation_summary="Get a video from user's collection",
    responses={200: schemas.collected_video_schema, 404: "Not found"},
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


@swagger_auto_schema(
    method="GET",
    operation_summary="Count collected videos",
    # responses={200: schemas.collected_video_schema, 404: "Not found"},
)
@api_view(["GET"])
def count_videos(request, user_id: int, video_id: int):
    """get collected videos count and all videos count"""

    if request.method == "GET":
        return Response("Not implemented", status=status.HTTP_501_NOT_IMPLEMENTED)
