// lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
  endpoint: string,
  method = "GET",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
  token?: string
) {
  const headers: Record<string, string> = {};
  if (!(body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const resp = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
    next: { revalidate: 0 }, // disables caching for dynamic calls
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any;
  try {
    data = await resp.json();
  } catch {
    data = { detail: "Invalid response format" };
  }

  if (!resp.ok) {
    const errorMsg =
      data?.detail || data?.message || JSON.stringify(data) || "Request failed";
    throw new Error(errorMsg);
  }

  return data;
}
