import { useEffect, useState } from "react";
import enseignantService from "../../../services/enseignantService";

export default function ClassementEnseignants() {

    const [classement, setClassement] = useState([]);

    useEffect(() => {
        charger();
    }, []);

    async function charger() {

        try {

            const response = await enseignantService.getClassement();

            setClassement(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function exporterExcel() {

        try {

            const response = await enseignantService.exportExcel();

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Classement_Enseignants.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="table-container">

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <h2>

                    ترتيب الأساتذة

                </h2>

                <button
                    className="enseignant-export-btn"
                    onClick={exporterExcel}
                >

                    تصدير Excel

                </button>

            </div>

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>الترتيب</th>

                        <th>الاسم الكامل</th>

                        <th>رقم التأجير</th>

                        <th>الهاتف</th>

                        <th>البريد الإلكتروني</th>

                        <th>الإطار</th>

                        <th>المؤسسة</th>

                        <th>المديرية الإقليمية</th>

                        <th>الأكاديمية</th>

                        <th>الموسم</th>

                        <th>الرياضة</th>

                        <th>البطولة</th>

                        <th>الرتبة</th>

                        <th>المكان</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        classement.length === 0 ?

                            (

                                <tr>

                                    <td colSpan="14">

                                        لا توجد بيانات

                                    </td>

                                </tr>

                            )

                            :

                            classement.map((enseignant, index) => {

                                const resultats =
                                    enseignant.resultats?.length
                                        ? enseignant.resultats
                                        : [{}];

                                return resultats.map((resultat, i) => (

                                    <tr
                                        key={`${enseignant.id}-${i}`}
                                    >

                                        {

                                            i === 0 &&

                                            <>

                                                <td rowSpan={resultats.length}>

                                                    {index + 1}

                                                </td>

                                                <td rowSpan={resultats.length}>

                                                    {enseignant.nomComplet}

                                                </td>

                                                <td rowSpan={resultats.length}>

                                                    {enseignant.numeroPpr}

                                                </td>

                                                <td rowSpan={resultats.length}>

                                                    {enseignant.telephone}

                                                </td>

                                                <td rowSpan={resultats.length}>

                                                    {enseignant.email}

                                                </td>

                                                <td rowSpan={resultats.length}>

                                                    {enseignant.cadre}

                                                </td>

                                                <td rowSpan={resultats.length}>

                                                    {enseignant.etablissement}

                                                </td>

                                                <td rowSpan={resultats.length}>

                                                    {enseignant.directionProvinciale}

                                                </td>

                                                <td rowSpan={resultats.length}>

                                                    {enseignant.academie}

                                                </td>

                                            </>

                                        }

                                        <td>

                                            {resultat.saison}

                                        </td>

                                        <td>

                                            {resultat.sport}

                                        </td>

                                        <td>

                                            {resultat.competition}

                                        </td>

                                        <td>

                                            {resultat.classement}

                                        </td>

                                        <td>

                                            {resultat.lieu}

                                        </td>

                                    </tr>

                                ));

                            })

                    }

                </tbody>

            </table>

        </div>

    );

}
