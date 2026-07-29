import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import adminService from "../../services/adminService";
import "./Dashboard.css";

const emptyStats = {
  total: 0,
  totalEnseignants: 0,
  enAttente: 0,
  acceptees: 0,
  refusees: 0,
};

export default function Dashboard() {
  const [stats, setStats] = useState(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const response = await adminService.getDashboardStats();
        if (active) {
          setStats({ ...emptyStats, ...(response.data || {}) });
          setError("");
        }
      } catch (requestError) {
        console.error("Erreur dashboard:", requestError);
        if (active) {
          setError("تعذر تحميل الإحصائيات. تحقق من تشغيل الخادم.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();
    return () => { active = false; };
  }, []);

  const totalEtudiants = Number(stats.total) || 0;
  const totalEnseignants = Number(stats.totalEnseignants) || 0;
  const total = totalEtudiants + totalEnseignants;

  return (
    <AdminLayout>
      <section className="dashboard" dir="rtl">
        <h1 className="dashboard-title">لوحة التحكم</h1>
        {loading && <p className="dashboard-status">جاري تحميل الإحصائيات...</p>}
        {error && <p className="dashboard-status dashboard-error">{error}</p>}
        <div className="dashboard-cards">
          <article className="dashboard-card blue">
            <h2>عدد طلبات الطلبة</h2>
            <strong>{totalEtudiants}</strong>
          </article>
          <article className="dashboard-card green">
            <h2>عدد طلبات الأساتذة</h2>
            <strong>{totalEnseignants}</strong>
          </article>
          <article className="dashboard-card orange">
            <h2>إجمالي الطلبات</h2>
            <strong>{total}</strong>
          </article>
          <article className="dashboard-card red">
            <h2>الطلبات قيد الانتظار</h2>
            <strong>{Number(stats.enAttente) || 0}</strong>
          </article>
        </div>
      </section>
    </AdminLayout>
  );
}
