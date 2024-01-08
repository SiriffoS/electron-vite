// src/providers/SupabaseProvider.tsx
import React, { ReactNode, useEffect } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import SupabaseContext from "_/contexts/supabase/supabaseContext";

const supabaseUrl = "https://zhjldsixjyyclgrxfwmm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpoamxkc2l4anl5Y2xncnhmd21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5NTE1NzYsImV4cCI6MjAxNDUyNzU3Nn0.UEfx7Nj-HCyCs_zKAXMHpR-uQDU5OQuIpejgz-C7I3Y";

const supabaseClient: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
);
interface SupabaseProviderProps {
  children: ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
