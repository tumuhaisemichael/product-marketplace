import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Check if API key exists
if (!process.env.OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY is not set in environment variables');
}

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

        console.log('🤖 Received message:', message);
        console.log('🤖 Business ID:', businessId);
        console.log('🤖 Using API key:', process.env.OPENROUTER_API_KEY ? '✓ Present' : '✗ Missing');

        // Fetch products from your backend
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

        if (!productsResponse.ok) {
            console.error('❌ Failed to fetch products:', productsResponse.status);
        }

        const productsData = productsResponse.ok ? await productsResponse.json() : [];
        const products = Array.isArray(productsData) ? productsData : (productsData.results || []);

        console.log(`🤖 Found ${products.length} products`);

        // Create context for AI
        const context = `You are a helpful product assistant for a marketplace business. 
        You have access to the following products from this business (in JSON format):
        ${JSON.stringify(products, null, 2)}
        
        Please answer the user's question based on these products. 
        If a product is found, describe it including its price.
        If you cannot find relevant information, politely say you don't have that information.
        Be concise and helpful.`;

        console.log("🤖 Calling Gemini 2.0 Flash on OpenRouter...");

        try {
            const completion = await openai.chat.completions.create({
                model: 'google/gemini-2.0-flash-exp:free',
                messages: [
                    { role: 'system', content: context },
                    { role: 'user', content: message },
                ],
                temperature: 0.7,
                max_tokens: 500,
            });

            console.log("✅ OpenRouter response received");
            const aiResponse = completion.choices[0].message.content;
            console.log("🤖 AI Response:", aiResponse?.substring(0, 100) + "...");

            // Store in backend
            try {
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
                console.log("✅ History saved");
            } catch (historyError) {
                console.error('❌ Failed to save history:', historyError);
            }

            return NextResponse.json({ response: aiResponse });

        } catch (openAIError: any) {
            console.error('❌ OpenRouter API error:', {
                message: openAIError.message,
                status: openAIError.status,
                response: openAIError.response?.data
            });

            return NextResponse.json(
                { error: `OpenRouter API error: ${openAIError.message}` },
                { status: openAIError.status || 500 }
            );
        }

    } catch (error: any) {
        console.error('❌ Chat API error:', {
            message: error.message,
            stack: error.stack
        });
        return NextResponse.json(
            { error: 'Failed to process chat message' },
            { status: 500 }
        );
    }
}