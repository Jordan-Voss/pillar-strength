import { getAuthToken } from "./supabase";

const BASE_URL = "https://api.pillarstrength.jordanvoss.dev/v1";

export async function apiRequest<T>(
  path: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken();
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
    }
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}