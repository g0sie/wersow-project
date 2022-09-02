from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Video
from .serializers import VideoSerializer


@api_view(['GET', 'POST'])
def videos_list(request):

    if request.method == 'GET':
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response({'videos': serializer.data})

    if request.method == 'POST':
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def video_details(request, id: int):

    try:
        video = Video.objects.get(id=id)
    except Video.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VideoSerializer(video)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = VideoSerializer(video, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def random_video(request):

    if request.method == 'GET':
        video = Video.random.all()
        serializer = VideoSerializer(video)
        return Response(serializer.data)
