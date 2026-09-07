import { Navigate } from "react-router-dom";

function hasAdminSession() {
  try {
    const admin = JSON.parse(localStorage.getItem("admin"));
    return Boolean(admin?.token);
  } catch {
    localStorage.removeItem("admin");
    return false;
  }
}

export default function ProtectedAdminRoute({ children }) {
  return hasAdminSession() ? children : <Navigate to="/admin/login" replace />;
}
