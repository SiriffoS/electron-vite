import { createServerClient, CookieMethods } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

interface SupabaseClientOptions {
  cookies: CookieMethods;
}
let supabase: SupabaseClient | null = null;

const SUPABASE_URL = "https://zhjldsixjyyclgrxfwmm.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpoamxkc2l4anl5Y2xncnhmd21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5NTE1NzYsImV4cCI6MjAxNDUyNzU3Nn0.UEfx7Nj-HCyCs_zKAXMHpR-uQDU5OQuIpejgz-C7I3Y";
export const initializeSupabase = (): SupabaseClient => {
  if (supabase === null) {
    supabase = createClient();
  }
  return supabase;
};

export const getSupabase = (): SupabaseClient => {
  if (supabase === null) {
    throw new Error(
      "Supabase has not been initialized. Call initializeSupabase() first.",
    );
  }

  return supabase;
};

export const updateSupabaseSession = async (
  newAccessToken: string,
  newRefreshToken: string,
) => {
  const supabase = getSupabase();

  await supabase.auth.setSession({
    access_token: newAccessToken,
    refresh_token: newRefreshToken,
  });
};

const createClient = () => {
  const options: SupabaseClientOptions = {
    cookies: {},
  };
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, options);
};
