from django.db import models

class ChatHistory(models.Model):
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE, related_name='chat_messages')
    business = models.ForeignKey('authentication.Business', on_delete=models.CASCADE, related_name='chat_history')
    user_message = models.TextField()
    ai_response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['business', 'timestamp']),
        ]
