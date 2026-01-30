'use client';

import { useApp } from '@/context/AppContext';
import { rubricInfoList } from '@/lib/rubrics';
import { RubricType } from '@/types/app';

export default function RubricSelector() {
    const { state, dispatch } = useApp();
    const selectedRubric = state.config.rubricType;

    const handleSelect = (rubricType: RubricType) => {
        dispatch({ type: 'SET_RUBRIC_TYPE', payload: rubricType });
    };

    return (
        <div className="space-y-4">
            <p className="text-gray-600 text-sm mb-4">
                กรุณาเลือกประเภทเอกสารที่ต้องการประเมิน
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rubricInfoList.map((rubric) => {
                    const isSelected = selectedRubric === rubric.id;
                    return (
                        <button
                            key={rubric.id}
                            onClick={() => handleSelect(rubric.id)}
                            className={`
                                relative p-6 rounded-2xl border-2 transition-all duration-300
                                text-left cursor-pointer
                                ${isSelected
                                    ? `border-[${rubric.borderColor}] bg-gradient-to-br from-[${rubric.color}] to-white shadow-lg scale-[1.02]`
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                }
                            `}
                            style={{
                                borderColor: isSelected ? rubric.borderColor : undefined,
                                background: isSelected
                                    ? `linear-gradient(135deg, ${rubric.color} 0%, white 100%)`
                                    : undefined
                            }}
                        >
                            {/* Selection indicator */}
                            {isSelected && (
                                <div
                                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                                    style={{ backgroundColor: rubric.borderColor }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}

                            {/* Icon */}
                            <div className="text-4xl mb-3">{rubric.icon}</div>

                            {/* Title */}
                            <h3 className={`text-lg font-bold mb-1 ${isSelected ? 'text-gray-800' : 'text-gray-700'}`}>
                                {rubric.name}
                            </h3>

                            {/* Short name badge */}
                            <span
                                className="inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2"
                                style={{
                                    backgroundColor: isSelected ? rubric.borderColor : '#E5E7EB',
                                    color: isSelected ? 'white' : '#6B7280'
                                }}
                            >
                                {rubric.shortName}
                            </span>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-2">
                                {rubric.description}
                            </p>

                            {/* Chapters info */}
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-400">ครอบคลุม:</span>
                                <span
                                    className="font-medium"
                                    style={{ color: isSelected ? rubric.borderColor : '#4B5563' }}
                                >
                                    {rubric.chapters}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Selected indicator text */}
            {selectedRubric && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>
                            เลือกแล้ว: <strong>{rubricInfoList.find(r => r.id === selectedRubric)?.name}</strong>
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}
