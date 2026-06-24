const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ?? "";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const config = {
  backendUrl,
  supabaseUrl,
  supabaseAnonKey,
} as const;

export function getBackendUrl(path = ""): string {
  if (!config.backendUrl) {
    throw new Error("VITE_BACKEND_URL is not configured");
  }
  return `${config.backendUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
