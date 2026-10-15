import { Navigate, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage.js";
import { FlatCheckPage } from "./pages/FlatCheckPage.js";
import { LandingPage } from "./pages/LandingPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/flatchecks/:id" element={<FlatCheckPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
