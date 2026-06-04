import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../services/apiClient";

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiRequest("/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      sessionStorage.setItem("vf_admin_token", password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Wrong password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090806] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#ff5a2f] to-[#c5963f] flex items-center justify-center text-white font-black text-lg">
            VF
          </div>
        </div>
        <h1 className="text-white text-2xl font-bold text-center mb-1">Admin Panel</h1>
        <p className="text-[#6b6259] text-sm text-center mb-8">ViralFlight - Talent Desk</p>

        <form onSubmit={handleSubmit} className="bg-[#111009] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
          <label className="block text-[#9d9282] text-xs font-semibold uppercase tracking-widest mb-2">
            Admin Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full bg-[#1a1712] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 pr-12 h-12 text-white placeholder-[#4a4540] outline-none focus:border-[#ff5a2f] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a4540] hover:text-[#ff5a2f] transition-colors"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
          {error && <p className="text-[#ff7a55] text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-linear-to-r from-[#ff5a2f] to-[#e8843a] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
