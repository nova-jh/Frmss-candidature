import "./Sidebar.css";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onToggle }) {
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
            <h2>منصة DPSS</h2>
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

      </nav>

      <div className="sidebar-footer">

        <button className="logout-btn">
          🚪 {isOpen && "تسجيل الخروج"}
        </button>

      </div>

    </aside>
  );
}
