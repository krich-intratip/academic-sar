// AI Provider and Model Types
// อัพเดทล่าสุด: มีนาคม 2569

export type AIProvider = 'gemini' | 'deepseek' | 'kimi' | 'openrouter';

export interface AIModel {
    value: string;
    label: string;
    isFree?: boolean;
    pricing?: string; // ราคาโดยประมาณ
}

export interface ProviderConfig {
    name: string;
    keyLabel: string;
    info: string;
    models: AIModel[];
    endpoint: string;
}

export const providerConfigs: Record<AIProvider, ProviderConfig> = {
    gemini: {
        name: 'Google Gemini',
        keyLabel: 'Gemini API Key',
        info: 'รับ API Key ได้ที่ <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-blue-600 hover:underline">Google AI Studio</a> (มี Free Tier!)',
        models: [
            // Gemini 2.5 Series (ล่าสุด - แนะนำ)
            { value: 'gemini-2.5-flash', label: '⭐ Gemini 2.5 Flash (แนะนำ - คุ้มค่ามาก)', isFree: true, pricing: 'ฟรี (Free Tier)' },
            { value: 'gemini-2.5-pro', label: '🧠 Gemini 2.5 Pro (Thinking - ซับซ้อน)', isFree: true, pricing: 'ฟรี (Free Tier)' },
            { value: 'gemini-2.5-flash-lite', label: '💚 Gemini 2.5 Flash-Lite (ประหยัดสุด)', isFree: true, pricing: 'ฟรี (Free Tier)' },
            // Gemini 2.0 Series (Stable)
            { value: 'gemini-2.0-flash', label: '✅ Gemini 2.0 Flash (เสถียร)', isFree: true, pricing: 'ฟรี (Free Tier)' },
            { value: 'gemini-2.0-flash-lite', label: '🟢 Gemini 2.0 Flash-Lite (เบา รวดเร็ว)', isFree: true, pricing: 'ฟรี (Free Tier)' }
        ],
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/'
    },
    deepseek: {
        name: 'DeepSeek',
        keyLabel: 'DeepSeek API Key',
        info: 'รับ API Key ได้ที่ <a href="https://platform.deepseek.com/api_keys" target="_blank" class="text-blue-600 hover:underline">DeepSeek Platform</a><br/>⚠️ ต้อง <a href="https://platform.deepseek.com/top_up" target="_blank" class="text-blue-600 hover:underline">เติมเงิน (Top Up)</a> ก่อนใช้งาน - ราคาถูกมาก!',
        models: [
            { value: 'deepseek-chat', label: '⭐🇹🇭 DeepSeek Chat (แนะนำ ฉลาด ถูก)', isFree: false, pricing: '$0.14/$0.28 ต่อ 1M' },
            { value: 'deepseek-reasoner', label: '🧠🇹🇭 DeepSeek Reasoner (Thinking Mode)', isFree: false, pricing: '$0.55/$2.19 ต่อ 1M' }
        ],
        endpoint: 'https://api.deepseek.com/chat/completions'
    },
    kimi: {
        name: 'Kimi (Moonshot)',
        keyLabel: 'Kimi API Key',
        info: 'รับ API Key ได้ที่ <a href="https://platform.moonshot.ai/console" target="_blank" class="text-blue-600 hover:underline">Moonshot Platform</a><br/>🌙 โมเดล 1T params รองรับ 256K context - <a href="https://platform.moonshot.ai/console/pay" target="_blank" class="text-blue-600 hover:underline">เติมเงินเริ่มต้น $1</a>',
        models: [
            { value: 'kimi-k2-0905-preview', label: '⭐🌙 Kimi K2 0905 (ใหม่สุด แนะนำ)', isFree: false, pricing: '$0.60/$2.50 ต่อ 1M' },
            { value: 'kimi-k2-0711-preview', label: '✅🌙 Kimi K2 0711 (เสถียร)', isFree: false, pricing: '$0.60/$2.50 ต่อ 1M' },
            { value: 'kimi-k2-thinking', label: '🧠🌙 Kimi K2 Thinking (Reasoning)', isFree: false, pricing: '$0.60/$2.50 ต่อ 1M' }
        ],
        endpoint: 'https://api.moonshot.ai/v1/chat/completions'
    },
    openrouter: {
        name: 'OpenRouter',
        keyLabel: 'OpenRouter API Key',
        info: 'รับ API Key ได้ที่ <a href="https://openrouter.ai/keys" target="_blank" class="text-blue-600 hover:underline">OpenRouter</a><br/>✅ รองรับ 300+ models รวมถึง Claude, DeepSeek, Qwen, Gemini, Typhoon และอื่นๆ',
        models: [
            // === 🆓 โมเดลฟรี (Free Tier) ===
            // Google Gemini (ฟรี - แนะนำสุด)
            { value: 'google/gemini-2.5-flash', label: '🆓⭐ Gemini 2.5 Flash (ฟรี แนะนำ รองรับไทย)', isFree: true, pricing: 'ฟรี' },
            { value: 'google/gemini-2.5-pro', label: '🆓🧠 Gemini 2.5 Pro (ฟรี Thinking รองรับไทย)', isFree: true, pricing: 'ฟรี' },

            // DeepSeek จีน (ฟรี - รองรับไทย)
            { value: 'deepseek/deepseek-chat-v3-0324:free', label: '🆓🔵 DeepSeek V3 (ฟรี คุ้มสุด รองรับไทย)', isFree: true, pricing: 'ฟรี' },
            { value: 'deepseek/deepseek-r1:free', label: '🆓🔵 DeepSeek R1 Reasoning (ฟรี รองรับไทย)', isFree: true, pricing: 'ฟรี' },

            // Qwen จีน (ฟรี - รองรับไทย)
            { value: 'qwen/qwen3-235b-a22b:free', label: '🆓🟣 Qwen 3 235B (ฟรี ฉลาด รองรับไทย)', isFree: true, pricing: 'ฟรี' },
            { value: 'qwen/qwen3-30b-a3b:free', label: '🆓🟣 Qwen 3 30B (ฟรี เร็ว รองรับไทย)', isFree: true, pricing: 'ฟรี' },

            // Meta Llama (ฟรี - รองรับไทย)
            { value: 'meta-llama/llama-3.3-70b-instruct:free', label: '🆓🦙 Llama 3.3 70B (ฟรี รองรับไทย)', isFree: true, pricing: 'ฟรี' },

            // Mistral (ฟรี - รองรับไทย)
            { value: 'mistralai/mistral-small-3.1-24b-instruct:free', label: '🆓🟠 Mistral Small 3.1 24B (ฟรี รองรับไทย)', isFree: true, pricing: 'ฟรี' },

            // === 💰 โมเดลมีค่าใช้จ่าย ===
            // DeepSeek (ราคาถูกมาก รองรับไทย)
            { value: 'deepseek/deepseek-chat-v3-0324', label: '💚🔵 DeepSeek V3 (ถูกมาก รองรับไทย)', isFree: false, pricing: '$0.25/$0.27 ต่อ 1M' },

            // Claude (แพง แต่ฉลาด รองรับไทย)
            { value: 'anthropic/claude-sonnet-4-5', label: '💰🟤 Claude Sonnet 4.5 (แพง รองรับไทย)', isFree: false, pricing: '$3/$15 ต่อ 1M' },
            { value: 'anthropic/claude-haiku-4-5', label: '✅🟤 Claude Haiku 4.5 (คุ้มค่า รองรับไทย)', isFree: false, pricing: '$0.8/$4 ต่อ 1M' },

            // OpenAI (รองรับไทย)
            { value: 'openai/gpt-4.1', label: '💰🟢 GPT-4.1 (แพง รองรับไทย)', isFree: false, pricing: '$2/$8 ต่อ 1M' },
            { value: 'openai/gpt-4.1-mini', label: '✅🟢 GPT-4.1 Mini (คุ้มค่า รองรับไทย)', isFree: false, pricing: '$0.4/$1.6 ต่อ 1M' },

            // Moonshot/Kimi จีน (ราคาถูก รองรับไทย)
            { value: 'moonshotai/kimi-k2', label: '💚🌙 Kimi K2 (ถูก รองรับไทย)', isFree: false, pricing: '$0.15/$2.50 ต่อ 1M' },

            // === 🇹🇭 โมเดลไทย (Thai-first) ===
            { value: 'scb10x/typhoon2-70b-instruct', label: '🇹🇭 Typhoon 2 70B (ไทยโดยเฉพาะ)', isFree: false, pricing: '$0.5/$1.5 ต่อ 1M' },
            { value: 'scb10x/typhoon2-8b-instruct', label: '🇹🇭💚 Typhoon 2 8B (ไทย ถูก)', isFree: false, pricing: '$0.1/$0.3 ต่อ 1M' }
        ],
        endpoint: 'https://openrouter.ai/api/v1/chat/completions'
    }
};

export interface AICallOptions {
    provider: AIProvider;
    apiKey: string;
    model: string;
    prompt: string;
    temperature?: number;
    maxTokens?: number;
}

export interface AIResponse {
    success: boolean;
    content?: string;
    error?: string;
}
