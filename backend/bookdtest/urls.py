from django.contrib import admin
from django.urls import path, include
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
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('dj_rest_auth.urls')),  # ✅ Ensure this line is correct
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # ✅ Ensure this is separate
]
