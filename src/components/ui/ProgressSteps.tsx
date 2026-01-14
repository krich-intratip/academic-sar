'use client';

interface ProgressStepsProps {
    currentStep: number;
    steps: { label: string }[];
}

export default function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
    return (
        <div className="flex justify-between flex-wrap gap-4 mb-8">
            {steps.map((step, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;

                return (
                    <div key={index} className="flex-1 text-center min-w-[100px]">
                        <div
                            className={`
                w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2
                font-semibold text-sm transition-all duration-300
                ${isCompleted
                                    ? 'bg-[#81C784] text-white'
                                    : isActive
                                        ? 'bg-[#1976D2] text-white shadow-[0_0_0_4px_rgba(25,118,210,0.3)]'
                                        : 'bg-gray-200 text-gray-600'
                                }
              `}
                        >
                            {isCompleted ? '✓' : stepNum}
                        </div>
                        <div className="text-sm text-gray-600">{step.label}</div>
                    </div>
                );
            })}
        </div>
    );
}
