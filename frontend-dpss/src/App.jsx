import { BrowserRouter, Routes, Route } from "react-router-dom";

import CandidatureForm from "./pages/etudiant/CandidatureForm";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Etudiants from "./pages/admin/Etudiants";
import Home from "./pages/home/Home";
import CandidatureEnseignant from "./pages/enseignant/CandidatureEnseignant";
import Enseignants from "./pages/admin/Enseignants";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Candidat */}
        <Route path="/" element={<Home />} />
        <Route path="/etudiant/candidature" element={<CandidatureForm />} />

        {/* Enseignant */}
        <Route
          path="/enseignant/candidature"
          element={<CandidatureEnseignant />}
        />
        <Route path="/admin/enseignants" element={<Enseignants />} />

        {/* Administration */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/etudiants" element={<Etudiants />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
