from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Venue
from .serializers import VenueSerializer

class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    permission_classes = [AllowAny]  # ✅ Temporarily allow all users
