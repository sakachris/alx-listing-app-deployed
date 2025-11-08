// lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
  endpoint: string,
  method = "GET",
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

// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// export async function apiRequest(
//   endpoint: string,
//   method = "GET",
//   body?: any,
//   token?: string
// ) {
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//   };
//   if (token) headers["Authorization"] = `Bearer ${token}`;

//   const resp = await fetch(`${API_BASE}${endpoint}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   let data: any;
//   try {
//     // Try parsing JSON once only
//     data = await resp.json();
//   } catch (err) {
//     // Fallback if response isn’t JSON
//     data = { detail: "Invalid response format" };
//   }

//   if (!resp.ok) {
//     const errorMsg =
//       data?.detail || data?.message || JSON.stringify(data) || "Request failed";
//     throw new Error(errorMsg);
//   }

//   return data;
// }
