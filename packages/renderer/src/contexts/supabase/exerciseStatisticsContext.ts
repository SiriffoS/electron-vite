// ExerciseServiceContext.ts
import { createContext, Context } from "react";
import { ExerciseStatisticsHelper } from "./exerciseStatisticsHelper";

export const ExerciseStatisticsContext: Context<ExerciseStatisticsHelper | null> =
  createContext<ExerciseStatisticsHelper | null>(null);
