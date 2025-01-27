from rest_framework import serializers
from .models import Venue, Event

class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'  # ✅ Ensures all fields are required unless set as optional