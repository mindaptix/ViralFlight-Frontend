const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

function headers(token) {
  return { "Content-Type": "application/json", "x-admin-token": token };
}

export async function fetchInfluencers(token, { page = 1, limit = 20, status = "", search = "" } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (status) params.set("status", status);
  if (search) params.set("search", search);
  const res = await fetch(`${BASE}/api/admin/influencers?${params}`, { headers: headers(token) });
  if (!res.ok) throw new Error((await res.json()).message ?? "Failed to fetch");
  return res.json();
}

export async function fetchInfluencerById(token, id) {
  const res = await fetch(`${BASE}/api/admin/influencers/${id}`, { headers: headers(token) });
  if (!res.ok) throw new Error((await res.json()).message ?? "Not found");
  return res.json();
}

export async function updateStatus(token, id, status) {
  const res = await fetch(`${BASE}/api/admin/influencers/${id}/status`, {
    method: "PATCH",
    headers: headers(token),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error((await res.json()).message ?? "Update failed");
  return res.json();
}

export async function updateInfluencer(token, id, payload) {
  const res = await fetch(`${BASE}/api/admin/influencers/${id}`, {
    method: "PATCH",
    headers: headers(token),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).message ?? "Update failed");
  return res.json();
}
