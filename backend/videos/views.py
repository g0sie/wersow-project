from django.http import JsonResponse

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


@api_view(['GET'])
def video_details(request, id: int):
    if request.method == 'GET':
        video = Video.objects.get(id=id)
        serializer = VideoSerializer(video)
        return Response(serializer.data)
