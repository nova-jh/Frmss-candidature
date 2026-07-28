import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import SearchBar from "../../components/admin/SearchBar";
import EnseignantModal from "../../components/admin/EnseignantModal";
import ClassementEnseignants from "../../components/admin/classement/ClassementEnseignants";

import enseignantService from "../../services/enseignantService";

import "./Enseignants.css";

export default function Enseignants() {

    const [enseignants, setEnseignants] = useState([]);
    const [search, setSearch] = useState("");

    const [selectedEnseignant, setSelectedEnseignant] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        charger();
    }, []);

    async function charger() {

        try {

            const response = await enseignantService.getAll();

            setEnseignants(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function supprimer(id) {

        const confirmation = window.confirm(
            "هل تريد حذف هذا الطلب ؟"
        );

        if (!confirmation) return;

        try {

            await enseignantService.delete(id);

            charger();

            alert("تم حذف الطلب بنجاح");

        } catch (error) {

            console.error(error);

            alert("حدث خطأ أثناء الحذف");

        }

    }

    const enseignantsFiltres = enseignants.filter((e) =>

        e.nomComplet?.toLowerCase().includes(search.toLowerCase()) ||

        e.numeroPpr?.toLowerCase().includes(search.toLowerCase()) ||

        e.etablissement?.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <AdminLayout>

            <h1 className="page-title">

                طلبات جوائز التميز الخاصة بالأساتذة

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

                            <th>رقم التأجير</th>

                            <th>المؤسسة</th>

                            <th>عدد الإنجازات</th>

                            <th>الإجراءات</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            enseignantsFiltres.length === 0 ?

                                (

                                    <tr>

                                        <td colSpan="5">

                                            لا توجد طلبات حاليا

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    enseignantsFiltres.map((enseignant) => (

                                        <tr key={enseignant.id}>

                                            <td>

                                                {enseignant.nomComplet}

                                            </td>

                                            <td>

                                                {enseignant.numeroPpr}

                                            </td>

                                            <td>

                                                {enseignant.etablissement}

                                            </td>

                                            <td>

                                                {enseignant.resultats?.length || 0}

                                            </td>

                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="action-btn view-btn"
                                                        onClick={() => {

                                                            setSelectedEnseignant(enseignant);

                                                            setOpenModal(true);

                                                        }}
                                                    >

                                                        عرض

                                                    </button>

                                                    <button
                                                        className="action-btn delete-btn"
                                                        onClick={() => supprimer(enseignant.id)}
                                                    >

                                                        حذف

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )

                        }

                    </tbody>

                </table>

            </div>

            <EnseignantModal

                open={openModal}

                enseignant={selectedEnseignant}

                onClose={() => setOpenModal(false)}

            />

            <ClassementEnseignants/>

        </AdminLayout>

    );

}