from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import generics

from drf_yasg.utils import swagger_auto_schema

from .models import Video
from .serializers import VideoSerializer
from . import schemas


@swagger_auto_schema(
    method="GET",
    operation_summary="List of all videos",
    responses={200: schemas.videos_schema},
)
@swagger_auto_schema(
    method="POST",
    operation_summary="Add a new video",
    responses={201: schemas.post_video_response, 400: "Invalid data"},
)
@api_view(["GET", "POST"])
def videos_list(request):

    if request.method == "GET":
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response({"videos": serializer.data})

    if request.method == "POST":
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("Invalid data", status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def video_details(request, id: int):

    try:
        video = Video.objects.get(id=id)
    except Video.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = VideoSerializer(video)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = VideoSerializer(video, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def random_video(request):

    if request.method == "GET":
        video = Video.objects.random()
        if video:
            serializer = VideoSerializer(video)
            return Response(serializer.data)
        return Response(
            {"error": "there are no videos to pick from"},
            status=status.HTTP_428_PRECONDITION_REQUIRED,
        )


@api_view(["GET"])
def todays_video(request):

    if request.method == "GET":
        video = Video.objects.todays()
        if video:
            serializer = VideoSerializer(video)
            return Response(serializer.data)
        return Response(
            {"error": "there is no today's video"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
