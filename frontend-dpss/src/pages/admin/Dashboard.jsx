import AdminLayout from "../../components/admin/AdminLayout";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

export default function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        totalEnseignants: 0,
        enAttente: 0,
        acceptees: 0,
        refusees: 0
    });
    
    useEffect(() => {
        chargerDashboard();
    }, []);
    async function chargerDashboard() {
        try {
            const statsResponse = await adminService.getDashboardStats();
            setStats(statsResponse.data);
        
        } catch (error) {
            console.error(error);
        }
    }

    const totalEnseignants = stats.totalEnseignants ?? 0;
    const totalCandidatures = stats.total + totalEnseignants;

    return (

        <AdminLayout>

            <div className="dashboard">

                <h1 className="dashboard-title">

                    لوحة التحكم

                </h1>

                <div className="cards">

                    <div className="card blue">

                        <h2>عدد طلبات الطلبة</h2>

                        <span>{stats.total}</span>

                    </div>

                    <div className="card green">

                        <h2>عدد طلبات الأساتذة</h2>

                        <span>{totalEnseignants}</span>

                    </div>

                

                    <div className="card red">

                        <h2>إجمالي الطلبات</h2>

                        <span>{totalCandidatures}</span>
                    </div>

                </div>

    

            </div>

        </AdminLayout>

    );

}
