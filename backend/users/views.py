from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer


@api_view(['GET', 'POST'])
def register(request):

    if request.method == 'GET':
        pass

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
