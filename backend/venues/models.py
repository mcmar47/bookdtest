from django.db import models

class Venue(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    capacity = models.IntegerField()
    price_per_event = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
