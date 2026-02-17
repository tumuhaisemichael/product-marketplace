from rest_framework import serializers
from .models import ChatHistory

class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ['id', 'user', 'business', 'user_message', 'ai_response', 'timestamp']
        read_only_fields = ['user', 'business', 'timestamp']

    def create(self, validated_data):
        # Infer user and business from request
        request = self.context.get('request')
        validated_data['user'] = request.user
        validated_data['business'] = request.user.business
        return super().create(validated_data)
