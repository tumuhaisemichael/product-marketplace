'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { useChat } from '@/lib/hooks/useChat';
import { useAuth } from '@/lib/hooks/useAuth';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export default function ChatWidget() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { sendMessage, getHistory } = useChat();

    useEffect(() => {
        if (isOpen) {
            loadHistory();
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadHistory = async () => {
        try {
            const history = await getHistory();
            if (Array.isArray(history)) {

                // Better transformation:
                const flatMessages: Message[] = [];
                history.forEach((msg: any) => {
                    flatMessages.push({
                        id: `u-${msg.id}`,
                        text: msg.user_message,
                        isUser: true,
                        timestamp: new Date(msg.timestamp)
                    });
                    flatMessages.push({
                        id: `a-${msg.id}`,
                        text: msg.ai_response,
                        isUser: false,
                        timestamp: new Date(msg.timestamp) // rough approx
                    });
                });
                setMessages(flatMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
            }
        } catch (e) {
            console.error("Failed to load history", e);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await sendMessage(input, user?.business?.id);

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                isUser: false,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error: any) {
            console.error('Chat error:', error);
            const errorMessage = error.message || 'Sorry, I encountered an error. Please try again.';
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    text: errorMessage,
                    isUser: false,
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full h-14 w-14 shadow-lg"
                >
                    <MessageCircle size={24} />
                </Button>
            ) : (
                <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col border border-border">
                    {/* Header */}
                    <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-semibold">Product Assistant</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-primary-foreground/20 text-primary-foreground"
                        >
                            <X size={18} />
                        </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                        {messages.length === 0 && (
                            <div className="text-center text-muted-foreground mt-8">
                                <p>👋 Hi! I can help you with product information.</p>
                                <p className="text-sm mt-2">Try asking:</p>
                                <ul className="text-xs mt-2 space-y-1">
                                    <li>"What products are available?"</li>
                                    <li>"Show me products under $50"</li>
                                    <li>"Tell me about product X"</li>
                                </ul>
                            </div>
                        )}
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted rounded-lg p-3">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t bg-background">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                disabled={isLoading}
                            />
                            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                                <Send size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
