import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import adminService from "../../services/adminService";

import SearchBar from "../../components/admin/SearchBar";
import CandidatureModal from "../../components/admin/CandidatureModal";
import ClassementTabs from "../../components/admin/classement/ClassementTabs";

import "./Etudiants.css";

export default function Etudiants() {

    const [candidatures, setCandidatures] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCandidature, setSelectedCandidature] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        charger();
    }, []);

    async function charger() {
        try {
            const response = await adminService.getAllCandidatures();
            setCandidatures(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function supprimerCandidature(id) {
        const confirmation = window.confirm("هل تريد فعلاً حذف هذا الطلب؟");

        if (!confirmation) return;

        try {
            await adminService.deleteCandidature(id);
            charger();
            alert("تم حذف الطلب بنجاح.");
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء الحذف.");
        }
    }

    const candidaturesFiltrees = candidatures.filter((c) =>
        c.nomComplet?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.etablissementSup?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>

            <h1 className="page-title">
                طلبات منحة التميز الدراسي والرياضي
            </h1>

            <SearchBar
                value={search}
                onChange={setSearch}
            />

            <div className="table-container">

                <table className="admin-table">

                    <thead>
                        <tr>
                            <th>الاسم الكامل</th>
                            <th>رمز مسار</th>
                            <th>المعدل</th>
                            <th>البريد الإلكتروني</th>
                            
                            <th>المؤسسة</th>
                             
                            <th>الإجراءات</th>
                        </tr>
                    </thead>

                    <tbody>

                        {candidaturesFiltrees.length === 0 ? (

                            <tr>
                                <td colSpan="6">
                                    لا توجد طلبات حاليا
                                </td>
                            </tr>

                        ) : (

                            candidaturesFiltrees.map((candidature) => (

                                <tr key={candidature.id}>

                                    <td>{candidature.nomComplet}</td>
                                    <td>{candidature.codeMassar}</td>
                                    <td>{candidature.moyenneBac}</td>

                                    <td>{candidature.email}</td>

                                    <td>{candidature.etablissementSup}</td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="action-btn view-btn"
                                                onClick={() => {
                                                    setSelectedCandidature(candidature);
                                                    setOpenModal(true);
                                                }}
                                            >
                                                عرض
                                            </button>

                                            

                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() =>
                                                    supprimerCandidature(candidature.id)
                                                }
                                            >
                                                حذف
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            <CandidatureModal
                open={openModal}
                candidature={selectedCandidature}
                onClose={() => setOpenModal(false)}
            />

            <ClassementTabs />

        </AdminLayout>
    );
}