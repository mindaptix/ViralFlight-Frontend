import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchInfluencerById,
  fetchInfluencers,
  updateInfluencer,
  updateStatus,
} from "../../services/adminApi";

const STATUS_COLORS = {
  pending: "bg-[rgba(234,179,8,0.15)] text-[#fbbf24] border border-[rgba(234,179,8,0.25)]",
  approved: "bg-[rgba(34,197,94,0.15)] text-[#4ade80] border border-[rgba(34,197,94,0.25)]",
  rejected: "bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.25)]",
};

const PLATFORM_LABELS = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  moj: "Moj / Reels",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  twitter: "X",
};

const TEXT_FIELDS = [
  ["fullName", "Full Name"],
  ["displayName", "Display Name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["city", "City"],
  ["state", "State"],
  ["basedIn", "Based In"],
  ["gender", "Gender"],
  ["dob", "Date of Birth"],
  ["profilePhotoUrl", "Profile Photo URL"],
  ["bio", "Bio"],
  ["primaryPlatform", "Primary Platform"],
  ["avgViews", "Average Views"],
  ["engagementRate", "Engagement Rate"],
  ["verified", "Verified"],
  ["postingFrequency", "Posting Frequency"],
  ["audienceAgeGroup", "Audience Age Group"],
  ["audienceGender", "Audience Gender"],
  ["topAudienceLocation", "Top Audience Location"],
  ["audiencePurchasingPower", "Audience Purchasing Power"],
  ["analyticsScreenshotUrl", "Analytics Screenshot URL"],
  ["minBudget", "Minimum Budget"],
  ["turnaround", "Turnaround"],
  ["workedWithBrands", "Worked With Brands"],
  ["notableBrands", "Notable Brands"],
  ["bestCampaign", "Best Campaign"],
  ["extraNotes", "Extra Notes"],
  ["source", "Source"],
  ["referralCode", "Referral Code"],
];

const ARRAY_FIELDS = [
  ["primaryCategory", "Categories"],
  ["subcategories", "Subcategories"],
  ["languages", "Languages"],
  ["contentFormats", "Content Formats"],
  ["audienceTypes", "Audience Types"],
  ["collaborationTypes", "Collaboration Types"],
  ["brandCategories", "Brand Categories"],
  ["blockedCategories", "Blocked Categories"],
];

const PLATFORM_FIELDS = ["instagram", "youtube", "tiktok", "moj", "facebook", "linkedin", "twitter"];

function StatCard({ label, value, color }) {
  return (
    <div className="bg-[#111009] border border-[rgba(255,255,255,0.07)] rounded-2xl px-6 py-5">
      <p className="text-[#6b6259] text-xs font-semibold uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}

function valueText(value) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value ?? "";
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildForm(data) {
  const form = {};
  TEXT_FIELDS.forEach(([key]) => {
    form[key] = valueText(data[key]);
  });
  ARRAY_FIELDS.forEach(([key]) => {
    form[key] = valueText(data[key]);
  });
  form.status = data.status ?? "pending";
  form.platforms = {};
  PLATFORM_FIELDS.forEach((key) => {
    form.platforms[key] = {
      handle: data.platforms?.[key]?.handle ?? "",
      followers: data.platforms?.[key]?.followers ?? "",
    };
  });
  return form;
}

function DetailRow({ label, value }) {
  const text = valueText(value);
  if (!text) return null;

  return (
    <div className="grid gap-1 border-b border-[rgba(255,255,255,0.05)] py-3 sm:grid-cols-[170px_1fr]">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#6b6259]">{label}</span>
      <span className="text-sm text-[#d4cec7] break-words">{text}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#ff5a2f]">{title}</p>
      <div>{children}</div>
    </section>
  );
}

function TextInput({ label, value, onChange, multiline = false }) {
  const commonClass =
    "w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1a1712] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#ff5a2f]";

  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-[#9d9282]">{label}</span>
      {multiline ? (
        <textarea className={`${commonClass} min-h-24 resize-y`} value={value} onChange={onChange} />
      ) : (
        <input className={commonClass} value={value} onChange={onChange} />
      )}
    </label>
  );
}

function ProfileModal({ id, token, initialMode = "view", onClose, onSaved, onStatusChange }) {
  const [data, setData] = useState(null);
  const [form, setForm] = useState(null);
  const [mode, setMode] = useState("view");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetchInfluencerById(token, id).then((response) => {
      if (!active) return;
      setData(response.data);
      setForm(buildForm(response.data));
      setMode(initialMode);
    });
    return () => {
      active = false;
    };
  }, [id, initialMode, token]);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setPlatformField = (platform, key, value) => {
    setForm((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: { ...prev.platforms[platform], [key]: value },
      },
    }));
  };

  const handleStatus = async (status) => {
    setBusy(true);
    setError("");
    try {
      const response = await updateStatus(token, id, status);
      setData((prev) => ({ ...prev, status }));
      setForm((prev) => ({ ...prev, status }));
      onStatusChange(id, response.data.status);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async () => {
    setBusy(true);
    setError("");
    try {
      const payload = {};
      TEXT_FIELDS.forEach(([key]) => {
        payload[key] = form[key];
      });
      ARRAY_FIELDS.forEach(([key]) => {
        payload[key] = toArray(form[key]);
      });
      payload.status = form.status;
      payload.platforms = form.platforms;

      const response = await updateInfluencer(token, id, payload);
      setData(response.data);
      setForm(buildForm(response.data));
      setMode("view");
      onSaved(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!data || !form) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
        <div className="text-sm text-white animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4" onClick={onClose}>
      <div
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#111009]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-4 border-b border-[rgba(255,255,255,0.07)] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">{data.fullName || "Creator profile"}</h2>
            <p className="text-sm text-[#6b6259]">
              {data.displayName || "No display name"} | {data.city || "No city"}
              {data.state ? `, ${data.state}` : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_COLORS[data.status]}`}>
              {data.status}
            </span>
            {["approved", "rejected", "pending"].map((status) => (
              <button
                key={status}
                disabled={busy || data.status === status}
                onClick={() => handleStatus(status)}
                className={`h-9 rounded-xl px-3 text-xs font-bold capitalize transition-opacity disabled:opacity-40 ${
                  status === "approved"
                    ? "border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.15)] text-[#4ade80]"
                    : status === "rejected"
                      ? "border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.15)] text-[#f87171]"
                      : "border border-[rgba(234,179,8,0.25)] bg-[rgba(234,179,8,0.12)] text-[#fbbf24]"
                }`}
              >
                {status === "approved" ? "Approve" : status === "rejected" ? "Reject" : "Pending"}
              </button>
            ))}
            <button
              onClick={() => setMode((current) => (current === "view" ? "edit" : "view"))}
              className="h-9 rounded-xl border border-[rgba(255,90,47,0.45)] px-3 text-xs font-bold text-[#ff7a55]"
            >
              {mode === "view" ? "Edit" : "View"}
            </button>
            <button onClick={onClose} className="h-9 rounded-xl px-3 text-lg leading-none text-[#6b6259] hover:text-white">
              x
            </button>
          </div>
        </div>

        {error && <p className="border-b border-[rgba(239,68,68,0.2)] px-5 py-3 text-sm text-[#f87171]">{error}</p>}

        <div className="overflow-y-auto px-5 py-5">
          {mode === "view" ? (
            <div className="grid gap-7 lg:grid-cols-2">
              <Section title="Basic Details">
                <DetailRow label="Full Name" value={data.fullName} />
                <DetailRow label="Display Name" value={data.displayName} />
                <DetailRow label="Email" value={data.email} />
                <DetailRow label="Phone" value={data.phone} />
                <DetailRow label="Gender" value={data.gender} />
                <DetailRow label="Date of Birth" value={data.dob} />
                <DetailRow label="City" value={data.city} />
                <DetailRow label="State" value={data.state} />
                <DetailRow label="Based In" value={data.basedIn} />
                <DetailRow label="Bio" value={data.bio} />
                <DetailRow label="Profile Photo" value={data.profilePhotoUrl} />
              </Section>

              <Section title="Platform Proof">
                <DetailRow label="Primary Platform" value={PLATFORM_LABELS[data.primaryPlatform] || data.primaryPlatform} />
                <DetailRow label="Average Views" value={data.avgViews} />
                <DetailRow label="Engagement Rate" value={data.engagementRate} />
                <DetailRow label="Verified" value={data.verified} />
                {PLATFORM_FIELDS.map((key) => (
                  <DetailRow
                    key={key}
                    label={PLATFORM_LABELS[key]}
                    value={
                      data.platforms?.[key]?.handle
                        ? `${data.platforms[key].handle} | ${data.platforms[key].followers || "followers not added"}`
                        : ""
                    }
                  />
                ))}
                <DetailRow label="Analytics Screenshot" value={data.analyticsScreenshotUrl} />
              </Section>

              <Section title="Content">
                <DetailRow label="Categories" value={data.primaryCategory} />
                <DetailRow label="Subcategories" value={data.subcategories} />
                <DetailRow label="Languages" value={data.languages} />
                <DetailRow label="Formats" value={data.contentFormats} />
                <DetailRow label="Posting Frequency" value={data.postingFrequency} />
              </Section>

              <Section title="Audience">
                <DetailRow label="Age Group" value={data.audienceAgeGroup} />
                <DetailRow label="Gender Split" value={data.audienceGender} />
                <DetailRow label="Top Location" value={data.topAudienceLocation} />
                <DetailRow label="Buying Power" value={data.audiencePurchasingPower} />
                <DetailRow label="Audience Types" value={data.audienceTypes} />
              </Section>

              <Section title="Collaboration">
                <DetailRow label="Collab Types" value={data.collaborationTypes} />
                <DetailRow label="Minimum Budget" value={data.minBudget} />
                <DetailRow label="Turnaround" value={data.turnaround} />
                <DetailRow label="Brand Categories" value={data.brandCategories} />
                <DetailRow label="Blocked Categories" value={data.blockedCategories} />
                <DetailRow label="Worked With Brands" value={data.workedWithBrands} />
                <DetailRow label="Notable Brands" value={data.notableBrands} />
                <DetailRow label="Best Campaign" value={data.bestCampaign} />
                <DetailRow label="Extra Notes" value={data.extraNotes} />
              </Section>

              <Section title="Admin Review">
                <DetailRow label="Source" value={data.source} />
                <DetailRow label="Referral Code" value={data.referralCode} />
                <DetailRow label="Terms Accepted" value={data.acceptedTerms} />
                <DetailRow label="Registered" value={new Date(data.createdAt).toLocaleString("en-IN")} />
                <DetailRow label="Last Updated" value={new Date(data.updatedAt).toLocaleString("en-IN")} />
              </Section>
            </div>
          ) : (
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                {TEXT_FIELDS.map(([key, label]) => (
                  <TextInput
                    key={key}
                    label={label}
                    value={form[key]}
                    multiline={["bio", "bestCampaign", "extraNotes"].includes(key)}
                    onChange={(event) => setField(key, event.target.value)}
                  />
                ))}
                {ARRAY_FIELDS.map(([key, label]) => (
                  <TextInput
                    key={key}
                    label={`${label} (comma separated)`}
                    value={form[key]}
                    onChange={(event) => setField(key, event.target.value)}
                  />
                ))}
                <label className="grid gap-1.5">
                  <span className="text-xs font-semibold text-[#9d9282]">Status</span>
                  <select
                    value={form.status}
                    onChange={(event) => setField("status", event.target.value)}
                    className="h-10 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1a1712] px-3 text-sm text-white outline-none focus:border-[#ff5a2f]"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </label>
              </div>

              <Section title="Platform Handles">
                <div className="grid gap-4 md:grid-cols-2">
                  {PLATFORM_FIELDS.map((platform) => (
                    <div key={platform} className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-4">
                      <p className="mb-3 text-sm font-bold text-white">{PLATFORM_LABELS[platform]}</p>
                      <div className="grid gap-3">
                        <TextInput
                          label="Handle / URL"
                          value={form.platforms[platform].handle}
                          onChange={(event) => setPlatformField(platform, "handle", event.target.value)}
                        />
                        <TextInput
                          label="Followers"
                          value={form.platforms[platform].followers}
                          onChange={(event) => setPlatformField(platform, "followers", event.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <div className="sticky bottom-0 flex justify-end gap-3 border-t border-[rgba(255,255,255,0.07)] bg-[#111009] py-4">
                <button
                  disabled={busy}
                  onClick={() => {
                    setForm(buildForm(data));
                    setMode("view");
                  }}
                  className="h-10 rounded-xl border border-[rgba(255,255,255,0.1)] px-4 text-sm font-bold text-[#d4cec7] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  disabled={busy}
                  onClick={handleSave}
                  className="h-10 rounded-xl bg-gradient-to-r from-[#ff5a2f] to-[#e8843a] px-5 text-sm font-bold text-white disabled:opacity-50"
                >
                  {busy ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("vf_admin_token");

  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [openInEdit, setOpenInEdit] = useState(false);
  const LIMIT = 15;

  useEffect(() => {
    if (!token) navigate("/admin");
  }, [token, navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchInfluencers(token, { page, limit: LIMIT, status: statusFilter, search });
      setRows(response.data);
      setTotal(response.total);
      const map = { total: response.total, pending: 0, approved: 0, rejected: 0 };
      response.stats.forEach((item) => {
        map[item._id] = item.count;
      });
      setStats(map);
    } catch {
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  }, [token, page, statusFilter, search, navigate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const handleStatusChange = async (id, status) => {
    await updateStatus(token, id, status);
    setRows((prev) => prev.map((row) => (row._id === id ? { ...row, status } : row)));
    load();
  };

  const handleSaved = (updated) => {
    setRows((prev) =>
      prev.map((row) =>
        row._id === updated._id
          ? {
              ...row,
              fullName: updated.fullName,
              displayName: updated.displayName,
              email: updated.email,
              phone: updated.phone,
              primaryPlatform: updated.primaryPlatform,
              primaryCategory: updated.primaryCategory,
              status: updated.status,
              city: updated.city,
              state: updated.state,
              verified: updated.verified,
              avgViews: updated.avgViews,
            }
          : row,
      ),
    );
    load();
  };

  const openProfile = (id, edit = false) => {
    setSelectedId(id);
    setOpenInEdit(edit);
  };

  const totalPages = Math.ceil(total / LIMIT);

  const visibleRows = useMemo(() => rows ?? [], [rows]);

  return (
    <div className="min-h-screen bg-[#090806] text-white">
      <header className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5a2f] to-[#c5963f] text-sm font-black text-white">
            VF
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-white">ViralFlight</p>
            <p className="text-[11px] text-[#6b6259]">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("vf_admin_token");
            navigate("/admin");
          }}
          className="text-sm text-[#6b6259] transition-colors hover:text-white"
        >
          Logout
        </button>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Total" value={stats.total} color="text-white" />
          <StatCard label="Pending" value={stats.pending} color="text-[#fbbf24]" />
          <StatCard label="Approved" value={stats.approved} color="text-[#4ade80]" />
          <StatCard label="Rejected" value={stats.rejected} color="text-[#f87171]" />
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4a4540]"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email or phone..."
              className="h-11 w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111009] pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-[#4a4540] focus:border-[#ff5a2f]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
            className="h-11 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111009] px-4 text-sm text-[#d4cec7] outline-none transition-colors focus:border-[#ff5a2f]"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#111009]">
          {loading ? (
            <div className="py-20 text-center text-sm text-[#4a4540] animate-pulse">Loading profiles...</div>
          ) : visibleRows.length === 0 ? (
            <div className="py-20 text-center text-sm text-[#4a4540]">No profiles found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-sm">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.07)]">
                    {["Creator", "Contact", "Platform", "Category", "Status", "Registered", "Actions"].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#6b6259]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => (
                    <tr
                      key={row._id}
                      className="border-b border-[rgba(255,255,255,0.04)] transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-white">{row.fullName}</p>
                        <p className="text-xs text-[#6b6259]">{row.displayName}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-[#d4cec7]">{row.email}</p>
                        <p className="text-xs text-[#6b6259]">{row.phone}</p>
                      </td>
                      <td className="px-5 py-4">
                        {row.primaryPlatform ? (
                          <span className="inline-flex rounded-lg bg-[rgba(255,90,47,0.1)] px-2.5 py-1 text-xs font-bold text-[#ff7a55]">
                            {PLATFORM_LABELS[row.primaryPlatform] ?? row.primaryPlatform}
                          </span>
                        ) : (
                          <span className="text-[#4a4540]">-</span>
                        )}
                      </td>
                      <td className="max-w-[180px] truncate px-5 py-4 text-xs text-[#9d9282]">
                        {Array.isArray(row.primaryCategory) ? row.primaryCategory[0] ?? "-" : row.primaryCategory || "-"}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_COLORS[row.status]}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-[#6b6259]">
                        {new Date(row.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openProfile(row._id)}
                            className="h-8 rounded-lg border border-[rgba(255,255,255,0.1)] px-3 text-xs font-bold text-[#d4cec7] hover:border-[#ff5a2f]"
                          >
                            View
                          </button>
                          <button
                            onClick={() => openProfile(row._id, true)}
                            className="h-8 rounded-lg border border-[rgba(255,90,47,0.45)] px-3 text-xs font-bold text-[#ff7a55]"
                          >
                            Edit
                          </button>
                          <button
                            disabled={row.status === "approved"}
                            onClick={() => handleStatusChange(row._id, "approved")}
                            className="h-8 rounded-lg border border-[rgba(34,197,94,0.25)] px-3 text-xs font-bold text-[#4ade80] disabled:opacity-35"
                          >
                            Approve
                          </button>
                          <button
                            disabled={row.status === "rejected"}
                            onClick={() => handleStatusChange(row._id, "rejected")}
                            className="h-8 rounded-lg border border-[rgba(239,68,68,0.25)] px-3 text-xs font-bold text-[#f87171] disabled:opacity-35"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-[#6b6259]">
              Showing {(page - 1) * LIMIT + 1}-{Math.min(page * LIMIT, total)} of {total}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="h-9 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111009] px-4 text-sm text-[#d4cec7] transition-colors hover:border-[#ff5a2f] disabled:opacity-40"
              >
                Prev
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((current) => current + 1)}
                className="h-9 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111009] px-4 text-sm text-[#d4cec7] transition-colors hover:border-[#ff5a2f] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>

      {selectedId && (
        <ProfileModal
          id={selectedId}
          token={token}
          initialMode={openInEdit ? "edit" : "view"}
          onClose={() => setSelectedId(null)}
          onSaved={handleSaved}
          onStatusChange={(id, status) => {
            setRows((prev) => prev.map((row) => (row._id === id ? { ...row, status } : row)));
            load();
          }}
        />
      )}
    </div>
  );
}
