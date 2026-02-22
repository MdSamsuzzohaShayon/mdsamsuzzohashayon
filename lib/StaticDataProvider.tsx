'use client'

import React, { createContext, useContext, useMemo } from "react";
import portfolio from "../data/portfolio.json";
import { IPortfolioData } from "@/types";

const staticData: IPortfolioData = portfolio as IPortfolioData;
const StaticDataContext = createContext<IPortfolioData>(staticData);

export const useStaticData = () => useContext(StaticDataContext);

function StaticDataProvider({ children }: React.PropsWithChildren) {
  // useMemo prevents unnecessary re-renders if provider is ever wrapped by state
  const value = useMemo(() => staticData, []);
  return (
    <StaticDataContext.Provider value={value}>
      {children}
    </StaticDataContext.Provider>
  );
}

export default StaticDataProvider;