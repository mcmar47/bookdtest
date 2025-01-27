from django.contrib import admin
from django.urls import path, include
from .views import home  # ✅ Homepage
from rest_framework.routers import DefaultRouter
from venues.views import VenueViewSet, EventViewSet
from bookings.views import BookingRequestViewSet
from messaging.views import MessageViewSet
from users.views import UserViewSet

# ✅ Register all API endpoints correctly
router = DefaultRouter()
router.register(r'venues', VenueViewSet, basename='venues')
router.register(r'bookings', BookingRequestViewSet, basename='bookings')
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'users', UserViewSet, basename='users')
router.register(r'events', EventViewSet, basename='events')  # <-- Add this line


urlpatterns = [
    path('', home, name='home'),  # ✅ Homepage view
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # ✅ This registers ALL API routes correctly!
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
]
