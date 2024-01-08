// ExerciseServiceProvider.tsx
import React, { FC, useContext } from "react";
import { ExerciseStatisticsHelper } from "_/contexts/supabase/exerciseStatisticsHelper";
import SupabaseContext from "_/contexts/supabase/supabaseContext";
import { ExerciseStatisticsContext } from "_/contexts/supabase/exerciseStatisticsContext";
import { SupabaseClient } from "@supabase/supabase-js";

interface ExerciseServiceProviderProps {
  children: React.ReactNode;
}

export const ExerciseStatisticsProvider: FC<ExerciseServiceProviderProps> = ({
  children,
}) => {
  const supabaseClient = useContext<SupabaseClient | null>(SupabaseContext);
  let exerciseStatisticsHelper: ExerciseStatisticsHelper | null = null;

  if (supabaseClient) {
    exerciseStatisticsHelper = new ExerciseStatisticsHelper(supabaseClient);
  }

  return (
    <ExerciseStatisticsContext.Provider value={exerciseStatisticsHelper}>
      {children}
    </ExerciseStatisticsContext.Provider>
  );
};

export default ExerciseStatisticsProvider;
