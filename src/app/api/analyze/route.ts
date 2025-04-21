import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: 'ssk-proj-gbn4SGta8UdelIUqdxNb-HXkE4epDQCQTQn4FZAo7iAXE8PkJAgnRz8GBbfTHdnAjQr97i5zamT3BlbkFJ1xV6wM-B9lM8T124hGY4C1UEz2iR9gV9tXBV8WBlGRf-ZMsmGIa_iEz8XAxulaAkYrYAYEpuMA'
});

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json(
                { error: 'Image data is required' },
                { status: 400 }
            );
        }

        const base64Data = image.split(',')[1];

        const response = await openai.chat.completions.create({
            model: "gpt-4o-2024-11-20-vision",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Check if the subject is wearing a hat, if so then respond with FAIL and the reason why else respond with PASS" },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Data}`,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 500,
        });

        if (!response.choices[0].message.content) {
            throw new Error('No response from OpenAI');
        }

        return NextResponse.json({
            result: response.choices[0].message.content
        });

    } catch (error) {
        console.error('Error processing image:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Error processing image' },
            { status: 500 }
        );
    }
}