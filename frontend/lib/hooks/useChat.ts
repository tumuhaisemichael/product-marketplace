import apiClient from '@/lib/api/client';

export const useChat = () => {
    const sendMessage = async (message: string, businessId?: number) => {
        // Calls the Next.js API route
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ message, businessId: businessId || 1 })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send message');
        }
        
        const data = await response.json();
        return data.response;
    };

    const getHistory = async () => {
        try {
            // This should call backend to get history
            const response = await apiClient.get('/chat/history/');
            
            // Handle different response formats
            if (Array.isArray(response.data)) {
                return response.data;
            } else if (response.data.results && Array.isArray(response.data.results)) {
                return response.data.results;
            } else if (response.data && typeof response.data === 'object') {
                return [response.data];
            }
            
            return [];
        } catch (error) {
            console.error('Failed to fetch chat history:', error);
            return [];
        }
    };

    return { sendMessage, getHistory };
};

