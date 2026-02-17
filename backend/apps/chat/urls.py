from rest_framework.routers import DefaultRouter
from .views import ChatHistoryViewSet

router = DefaultRouter()
router.register(r'history', ChatHistoryViewSet, basename='chat_history')

urlpatterns = router.urls
