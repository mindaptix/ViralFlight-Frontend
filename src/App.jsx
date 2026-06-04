import { BrowserRouter, Route, Routes } from "react-router-dom";
import InfluencerRegistrationForm from "./features/influencer-registration/InfluencerRegistrationForm";
import AdminLogin from "./features/admin/AdminLogin";
import AdminDashboard from "./features/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InfluencerRegistrationForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
