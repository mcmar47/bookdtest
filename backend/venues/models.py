from django.db import models

class Venue(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    capacity = models.IntegerField()
    price_per_event = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Event(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)  # Optional event time
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='events')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} at {self.venue.name} on {self.date}"
