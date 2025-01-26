from django.db import models
from venues.models import Venue
from django.contrib.auth.models import User

class BookingRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE)
    date = models.DateField()
    message = models.TextField()
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Accepted', 'Accepted')], default='Pending')

    def __str__(self):
        return f"Booking for {self.venue.name} by {self.user.username}"
