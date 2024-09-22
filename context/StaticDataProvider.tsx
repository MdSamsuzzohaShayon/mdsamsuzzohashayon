'use client'

import React, { createContext, useContext } from "react";
import portfolio from "../data/portfolio.json";
import { IPortfolioData } from "@/types";

// Ensure portfolio.json is typed correctly
const staticData: IPortfolioData = portfolio as IPortfolioData;

// Create context with the correct type
const StaticDataContext = createContext<IPortfolioData>(staticData);

export const useStaticData = () => {
  const context = useContext(StaticDataContext);
  return context;
};

function StaticDataProvider({ children }: React.PropsWithChildren) {
  return (
    <StaticDataContext.Provider value={staticData}>
      {children}
    </StaticDataContext.Provider>
  );
}

export default StaticDataProvider;
