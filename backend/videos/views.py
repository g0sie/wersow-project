from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Video
from .serializers import VideoSerializer


@api_view(['GET'])
def videos_list(request):
    videos = Video.objects.all()
    serializer = VideoSerializer(videos, many=True)
    return Response({'videos': serializer.data})
