from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingRequestViewSet

router = DefaultRouter()
router.register(r'', BookingRequestViewSet)

urlpatterns = router.urls
