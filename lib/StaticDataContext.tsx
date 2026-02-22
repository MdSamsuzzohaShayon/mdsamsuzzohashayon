// lib/StaticDataContext.tsx
'use client';

import { createContext, useContext } from "react";
import { IPortfolioData } from "@/types";

export const StaticDataContext = createContext<IPortfolioData | null>(null);

export function useStaticData() {
  const context = useContext(StaticDataContext);
  if (!context) {
    throw new Error('useStaticData must be used within StaticDataProvider');
  }
  return context;
}