'use client';

import { useApp } from '@/context/AppContext';
import { providerConfigs } from '@/types/ai';

export default function ModelSelector() {
    const { state, dispatch, saveConfig } = useApp();

    if (!state.config.provider) return null;

    const models = providerConfigs[state.config.provider].models;

    const handleModelChange = (value: string) => {
        dispatch({ type: 'SET_MODEL', payload: value });
        setTimeout(saveConfig, 100);
    };

    const handleCustomModelChange = (value: string) => {
        dispatch({ type: 'SET_CUSTOM_MODEL', payload: value || null });
        setTimeout(saveConfig, 100);
    };

    return (
        <div className="mb-4 animate-fadeIn">
            <label className="block font-medium mb-2">เลือก Model:</label>
            <select
                value={state.config.model || ''}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
          focus:outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-blue-200
          transition-all duration-300 bg-white"
            >
                <option value="">-- เลือก Model --</option>
                {models.map(model => (
                    <option key={model.value} value={model.value}>
                        {model.label}
                    </option>
                ))}
            </select>

            <div className="mt-4 p-4 bg-[#E3F2FD] rounded-xl">
                <label className="block text-sm text-gray-600 mb-2">
                    🆕 หรือระบุชื่อ Model เอง (สำหรับโมเดลใหม่ที่ยังไม่มีในรายการ):
                </label>
                <input
                    type="text"
                    value={state.config.customModel || ''}
                    onChange={(e) => handleCustomModelChange(e.target.value)}
                    placeholder="เช่น google/gemini-2.5-flash-thinking"
                    className="w-full px-4 py-2 border-2 border-[#90CAF9] rounded-lg
            focus:outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-blue-200
            transition-all duration-300"
                />
                <p className="text-xs text-gray-500 mt-2">
                    💡 ถ้ากรอกช่องนี้ ระบบจะใช้ชื่อโมเดลที่พิมพ์แทนที่จะใช้จาก dropdown ด้านบน
                </p>
            </div>
        </div>
    );
}
