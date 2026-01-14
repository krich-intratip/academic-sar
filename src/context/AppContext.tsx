'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppAction, AppConfig, AIProvider } from '@/types';

const STORAGE_KEY = 'academic_sar_config';

const initialState: AppState = {
    config: {
        provider: null,
        apiKey: null,
        model: null,
        customModel: null
    },
    pdfText: null,
    pdfFileName: null,
    pdfFileSize: null,
    isEvaluating: false,
    currentStep: 0,
    evaluationResults: null
};

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_PROVIDER':
            return {
                ...state,
                config: {
                    ...state.config,
                    provider: action.payload,
                    model: null,
                    customModel: null
                }
            };
        case 'SET_API_KEY':
            return {
                ...state,
                config: { ...state.config, apiKey: action.payload }
            };
        case 'SET_MODEL':
            return {
                ...state,
                config: { ...state.config, model: action.payload }
            };
        case 'SET_CUSTOM_MODEL':
            return {
                ...state,
                config: { ...state.config, customModel: action.payload }
            };
        case 'SET_PDF_TEXT':
            return {
                ...state,
                pdfText: action.payload.text,
                pdfFileName: action.payload.fileName,
                pdfFileSize: action.payload.fileSize
            };
        case 'CLEAR_PDF':
            return {
                ...state,
                pdfText: null,
                pdfFileName: null,
                pdfFileSize: null
            };
        case 'SET_EVALUATING':
            return { ...state, isEvaluating: action.payload };
        case 'SET_CURRENT_STEP':
            return { ...state, currentStep: action.payload };
        case 'SET_EVALUATION_RESULTS':
            return { ...state, evaluationResults: action.payload };
        case 'LOAD_CONFIG':
            return { ...state, config: action.payload };
        case 'RESET':
            return { ...initialState };
        default:
            return state;
    }
}

interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
    getEffectiveModel: () => string | null;
    isReadyToEvaluate: () => boolean;
    saveConfig: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Load saved config on mount
    useEffect(() => {
        try {
            const savedProvider = localStorage.getItem('academic_sar_provider');
            if (savedProvider) {
                const provider = savedProvider as AIProvider;
                const apiKey = localStorage.getItem(`academic_sar_apikey_${provider}`);
                const model = localStorage.getItem(`academic_sar_model_${provider}`);
                const customModel = localStorage.getItem(`academic_sar_custom_model_${provider}`);

                dispatch({
                    type: 'LOAD_CONFIG',
                    payload: {
                        provider,
                        apiKey,
                        model,
                        customModel
                    }
                });
            }
        } catch (error) {
            console.error('Error loading config:', error);
        }
    }, []);

    const saveConfig = () => {
        if (state.config.provider) {
            localStorage.setItem('academic_sar_provider', state.config.provider);
            if (state.config.apiKey) {
                localStorage.setItem(`academic_sar_apikey_${state.config.provider}`, state.config.apiKey);
            }
            if (state.config.model) {
                localStorage.setItem(`academic_sar_model_${state.config.provider}`, state.config.model);
            }
            if (state.config.customModel) {
                localStorage.setItem(`academic_sar_custom_model_${state.config.provider}`, state.config.customModel);
            } else {
                localStorage.removeItem(`academic_sar_custom_model_${state.config.provider}`);
            }
        }
    };

    const getEffectiveModel = (): string | null => {
        return state.config.customModel || state.config.model;
    };

    const isReadyToEvaluate = (): boolean => {
        return !!(
            state.config.provider &&
            state.config.apiKey &&
            getEffectiveModel() &&
            state.pdfText
        );
    };

    return (
        <AppContext.Provider value={{ state, dispatch, getEffectiveModel, isReadyToEvaluate, saveConfig }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
