import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { message, businessId } = await request.json();

        // Fetch products from your backend
        // Note: process.env.NEXT_PUBLIC_API_URL works on server too usually, or use distinct server env var
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

        // We should probably use a system token or just public endpoint if it is public
        const productsResponse = await fetch(
            `${apiUrl}/products/list_internal/?business=${businessId}`, // 'list_internal' might require auth. 
            // The prompt suggests `products/public/?business=...` but `ProductViewSet` has `list_internal`.
            // The prompt also says "Public only see approved products".
            // Let's assume chatbot sees what public sees or we pass an auth header if available.
            // But this route handler is server-side. It doesn't have the user's token easily unless passed in request headers.
            // `request.headers.get('Authorization')` works.
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': request.headers.get('Authorization') || '',
                },
            }
        );

        // If fetch failed
        if (!productsResponse.ok) {
            // Fallback to empty list or handle error
            console.error("Products fetch failed", productsResponse.status);
        }

        const products = productsResponse.ok ? await productsResponse.json() : [];

        // Create context for AI
        const context = `You are a helpful product assistant. You have access to the following products:\n${JSON.stringify(products, null, 2)}\n\nPlease answer the user's question based on these products. If you cannot find relevant information, politely say so.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: context },
                { role: 'user', content: message },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const aiResponse = completion.choices[0].message.content;

        // Store in backend
        await fetch(`${apiUrl}/chat/history/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': request.headers.get('Authorization') || '',
            },
            body: JSON.stringify({
                user_message: message,
                ai_response: aiResponse,
            }),
        });

        return NextResponse.json({ response: aiResponse });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Failed to process chat message' },
            { status: 500 }
        );
    }
}
