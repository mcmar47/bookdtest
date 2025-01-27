from django.contrib import admin
from django.urls import path, include
from .views import home  # ✅ Import the new homepage view
from rest_framework.routers import DefaultRouter
from venues.views import VenueViewSet
from bookings.views import BookingRequestViewSet
from messaging.views import MessageViewSet
from users.views import UserViewSet

router = DefaultRouter()
router.register(r'venues', VenueViewSet, basename='venues')
router.register(r'bookings', BookingRequestViewSet, basename='bookings')
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('', home, name='home'),  # ✅ Add this line for the homepage
    path('admin/', admin.site.urls),
    path('api/', include('venues.urls')),  # ✅ Ensure API routes are correct
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
]
