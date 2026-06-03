import { apiRequest } from "./apiClient";

function headers(token) {
  return { "x-admin-token": token };
}

export async function fetchInfluencers(token, { page = 1, limit = 20, status = "", search = "" } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (status) params.set("status", status);
  if (search) params.set("search", search);
  return apiRequest(`/api/admin/influencers?${params}`, { headers: headers(token) });
}

export async function fetchInfluencerById(token, id) {
  return apiRequest(`/api/admin/influencers/${id}`, { headers: headers(token) });
}

export async function updateStatus(token, id, status) {
  return apiRequest(`/api/admin/influencers/${id}/status`, {
    method: "PATCH",
    headers: headers(token),
    body: JSON.stringify({ status }),
  });
}

export async function updateInfluencer(token, id, payload) {
  return apiRequest(`/api/admin/influencers/${id}`, {
    method: "PATCH",
    headers: headers(token),
    body: JSON.stringify(payload),
  });
}
