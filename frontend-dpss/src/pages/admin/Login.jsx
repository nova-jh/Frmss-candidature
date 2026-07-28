import { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post("/admin/login", {
            email,
            password: motDePasse,
        });
        localStorage.setItem("admin", JSON.stringify(response.data));
        navigate("/admin/dashboard");
    } catch (err) {
        alert(err.response?.data || "Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-container" dir="rtl" lang="ar">

      <div className="login-card">

        <div className="logo-admin">
           🛡️
        </div>

        <h1>منصة مديرية النهوض بالرياضة المدرسية</h1>

        <h2>فضاء الإدارة</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>البريد الإلكتروني</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>كلمة المرور</label>

            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />

          </div>

          <button type="submit">

            تسجيل الدخول

          </button>

        </form>

      </div>

    </div>
  );
}