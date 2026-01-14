// AI Service Layer

import { AIProvider, providerConfigs } from '@/types/ai';

export async function callGemini(
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    const url = `${providerConfigs.gemini.endpoint}${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Gemini API Error');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

export async function callOpenAI(
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    const response = await fetch(providerConfigs.openai.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 8192
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API Error');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

export async function callOpenRouter(
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    const response = await fetch(providerConfigs.openrouter.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': typeof window !== 'undefined' ? window.location.href : '',
            'X-Title': 'Academic SAR Evaluation System'
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 8192
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenRouter API Error');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

export async function callAI(
    provider: AIProvider,
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    switch (provider) {
        case 'gemini':
            return callGemini(prompt, apiKey, model);
        case 'openai':
            return callOpenAI(prompt, apiKey, model);
        case 'openrouter':
            return callOpenRouter(prompt, apiKey, model);
        default:
            throw new Error('Unknown provider');
    }
}

export function parseAIResponse<T>(responseText: string): T {
    let cleanedText = responseText.trim();
    cleanedText = cleanedText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '');

    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        cleanedText = jsonMatch[0];
    }

    try {
        return JSON.parse(cleanedText) as T;
    } catch (error) {
        console.error('JSON Parse Error:', error, 'Raw:', responseText);
        throw new Error('ไม่สามารถแปลงผลลัพธ์เป็น JSON ได้');
    }
}
