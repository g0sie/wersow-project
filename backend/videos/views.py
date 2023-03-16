from drf_spectacular.utils import extend_schema, OpenApiResponse

from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from videos.models import Video, UserVideoRelation, NoVideosException
from videos.serializers import VideoSerializer, CollectedVideoSerializer


class TodaysVideo(APIView):
    """ViewSet for retrieving today's video."""

    @extend_schema(
        responses={
            200: VideoSerializer,
            503: OpenApiResponse(description="No videos in database."),
        }
    )
    def get(self, request):
        """Retrieve today's video."""
        try:
            video = Video.objects.todays()

        except NoVideosException:
            return Response(
                "There are no videos in database.",
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        serializer = VideoSerializer(video)
        return Response(serializer.data)


class MyVideos(generics.ListAPIView):
    """Get list of videos collected by user."""

    queryset = UserVideoRelation.objects.all()
    serializer_class = CollectedVideoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)
