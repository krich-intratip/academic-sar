// AI Service Layer
// อัพเดทล่าสุด: กุมภาพันธ์ 2569

import { AIProvider, providerConfigs } from '@/types/ai';

/**
 * ดึงข้อความ error จาก API response อย่างปลอดภัย
 */
function extractErrorMessage(error: unknown, fallback: string): string {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object') {
        const err = error as Record<string, unknown>;
        if (err.error && typeof err.error === 'object') {
            const innerErr = err.error as Record<string, unknown>;
            if (typeof innerErr.message === 'string') return innerErr.message;
        }
        if (typeof err.message === 'string') return err.message;
        if (typeof err.error === 'string') return err.error;
    }
    return fallback;
}

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
        const error = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(error, `Gemini API Error (${response.status})`));
    }

    const data = await response.json();

    // ตรวจสอบ response structure อย่างปลอดภัย
    if (!data?.candidates?.length) {
        throw new Error('Gemini API ไม่ได้ส่งผลลัพธ์กลับมา (no candidates)');
    }
    const candidate = data.candidates[0];
    if (!candidate?.content?.parts?.length) {
        throw new Error('Gemini API response ไม่มีเนื้อหา (no content parts)');
    }
    const text = candidate.content.parts[0]?.text;
    if (!text) {
        throw new Error('Gemini API response ไม่มีข้อความ (empty text)');
    }
    return text;
}

export async function callDeepSeek(
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    const response = await fetch(providerConfigs.deepseek.endpoint, {
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
        const error = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(error, `DeepSeek API Error (${response.status})`));
    }

    const data = await response.json();

    // ตรวจสอบ response structure อย่างปลอดภัย
    if (!data?.choices?.length) {
        throw new Error('DeepSeek API ไม่ได้ส่งผลลัพธ์กลับมา (no choices)');
    }
    const content = data.choices[0]?.message?.content;
    if (!content) {
        throw new Error('DeepSeek API response ไม่มีเนื้อหา (empty content)');
    }
    return content;
}

export async function callKimi(
    prompt: string,
    apiKey: string,
    model: string
): Promise<string> {
    const response = await fetch(providerConfigs.kimi.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: 'You are Kimi, an AI assistant. Please respond in Thai language.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.6,
            max_tokens: 8192
        })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(error, `Kimi API Error (${response.status})`));
    }

    const data = await response.json();

    // ตรวจสอบ response structure อย่างปลอดภัย
    if (!data?.choices?.length) {
        throw new Error('Kimi API ไม่ได้ส่งผลลัพธ์กลับมา (no choices)');
    }
    const content = data.choices[0]?.message?.content;
    if (!content) {
        throw new Error('Kimi API response ไม่มีเนื้อหา (empty content)');
    }
    return content;
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
        const error = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(error, `OpenRouter API Error (${response.status})`));
    }

    const data = await response.json();

    // ตรวจสอบ response structure อย่างปลอดภัย
    if (!data?.choices?.length) {
        throw new Error('OpenRouter API ไม่ได้ส่งผลลัพธ์กลับมา (no choices)');
    }
    const content = data.choices[0]?.message?.content;
    if (!content) {
        throw new Error('OpenRouter API response ไม่มีเนื้อหา (empty content)');
    }
    return content;
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
        case 'deepseek':
            return callDeepSeek(prompt, apiKey, model);
        case 'kimi':
            return callKimi(prompt, apiKey, model);
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
