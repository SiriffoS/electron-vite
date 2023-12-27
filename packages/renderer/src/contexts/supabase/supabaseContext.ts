import React from "react";
import { SupabaseClient } from "@supabase/supabase-js";

const SupabaseContext = React.createContext<SupabaseClient | null>(null);

export default SupabaseContext;
