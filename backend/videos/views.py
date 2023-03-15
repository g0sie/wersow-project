from drf_spectacular.utils import extend_schema, OpenApiTypes, OpenApiResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from videos.models import Video, NoVideosException
from videos.serializers import VideoSerializer


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
