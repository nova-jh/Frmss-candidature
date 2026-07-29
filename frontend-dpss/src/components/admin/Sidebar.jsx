import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`} dir="rtl">

      <button className="toggle-btn" onClick={onToggle}>
        ☰
      </button>

      <div className="sidebar-header">

        <div className="logo">
          🛡️
        </div>

        {isOpen && (
          <>
            <h2>منصة FRMSS</h2>
            <p>فضاء الإدارة</p>
          </>
        )}

      </div>

      <nav className="sidebar-menu">

        <NavLink to="/admin/dashboard" className="menu-item">
          🏠 {isOpen && <span>لوحة التحكم</span>}
        </NavLink>

        <NavLink to="/admin/etudiants" className="menu-item">
          🎓 {isOpen && <span>طلبات الطلبة</span>}
        </NavLink>

        <NavLink to="/admin/enseignants" className="menu-item">
          👨‍🏫 {isOpen && <span>طلبات الأساتذة</span>}
        </NavLink>
        <NavLink to="/admin/settings" className="menu-item">
        ⚙️ {isOpen && "الإعدادات"}
        </NavLink>

      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          🚪 {isOpen && "تسجيل الخروج"}
        </button>
      </div>

    </aside>
  );
}
