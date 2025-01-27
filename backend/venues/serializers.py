from rest_framework import serializers
from .models import Venue, Event

class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    venue_name = serializers.ReadOnlyField(source='venue.name')

    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'time', 'venue', 'venue_name', 'description']
