from rest_framework import viewsets
from .models import Venue, Event
from .serializers import VenueSerializer, EventSerializer

class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        """
        Optionally filters events by venue_id.
        Example: /api/events/?venue_id=1
        """
        venue_id = self.request.query_params.get('venue_id')
        if venue_id:
            return self.queryset.filter(venue_id=venue_id)
        return self.queryset
