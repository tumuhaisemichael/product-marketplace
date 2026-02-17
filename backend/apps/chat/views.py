from rest_framework import viewsets, permissions
from .models import ChatHistory
from .serializers import ChatHistorySerializer

class ChatHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = ChatHistorySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
         # User sees their own chat history or business chat history?
         # Probably wise to restrict.
         return ChatHistory.objects.filter(user=self.request.user)
