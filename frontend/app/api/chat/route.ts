import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Product Marketplace",
    }
});

export async function POST(request: Request) {
    try {
        const { message, businessId } = await request.json();

        // Fetch products from your backend
        // Inside Docker, we use the service name 'backend'
        const apiUrl = 'http://backend:8000/api';

        // Fetch products for context
        const productsResponse = await fetch(
            `${apiUrl}/products/list_internal/?business=${businessId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': request.headers.get('Authorization') || '',
                },
            }
        );

        const productsData = productsResponse.ok ? await productsResponse.json() : [];
        const products = Array.isArray(productsData) ? productsData : (productsData.results || []);

        console.log(`🤖 Chat Context: Found ${products.length} products for business ${businessId}`);

        // Create context for AI
        const context = `You are a helpful product assistant for a marketplace business. 
        You have access to the following products from this business (in JSON format):
        ${JSON.stringify(products, null, 2)}
        
        Please answer the user's question based on these products. 
        If a product is found, describe it including its price.
        If you cannot find relevant information, politely say you don't have that information.
        Be concise and helpful.`;

        console.log("🤖 Calling OpenRouter...");
        const completion = await openai.chat.completions.create({
            model: 'meta-llama/llama-3.3-70b-instruct:free',
            messages: [
                { role: 'system', content: context },
                { role: 'user', content: message },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const aiResponse = completion.choices[0].message.content;
        console.log("🤖 AI Response:", aiResponse);

        // Store in backend
        console.log("🤖 Saving history...");
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
