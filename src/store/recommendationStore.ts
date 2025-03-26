import {  Preferences, Product } from "@/components/types/productType";
import { create } from "zustand";

interface RecommendationState {
    preferences: Preferences;
    recommendations: Product[];
    setPreferences: (prefs: Partial<Preferences>) => void;
    setRecommendations: (recs: Product[]) => void;
}

export const useRecommendationStore = create<RecommendationState>((set) => ({
    preferences: { sweet: false, bitter: false, sour: false, noBitter: false },
    recommendations: [],
    setPreferences: (prefs) =>
        set((state) => ({ preferences: { ...state.preferences, ...prefs } })),
    setRecommendations: (recs) => set({ recommendations: recs }),
}));