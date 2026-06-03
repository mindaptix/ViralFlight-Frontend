const configuredBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const API_BASE_URL = configuredBaseUrl || (import.meta.env.DEV ? "http://localhost:5000" : "");

export function getApiBaseUrl() {
  return API_BASE_URL;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return { success: false, message: await response.text() };
}

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("Production API URL is not configured. Set VITE_API_URL in Vercel and redeploy.");
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error("Cannot reach server. Please try again.");
  }

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || "Request failed. Please try again.");
  }

  return data;
}
