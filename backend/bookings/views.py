from rest_framework.viewsets import ModelViewSet
from .models import BookingRequest
from .serializers import BookingRequestSerializer

class BookingRequestViewSet(ModelViewSet):
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestSerializer
