from rest_framework import generics
from .models import Event
from .serializers import EventSerializer

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        """
        Optionally filters events by venue ID.
        Example: /events?venue_id=1
        """
        venue_id = self.request.query_params.get('venue_id')
        if venue_id:
            return self.queryset.filter(venue_id=venue_id)
        return self.queryset

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
