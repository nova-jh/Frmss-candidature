import "./ClassementTable.css";

export default function ClassementTable({ candidats = [] }) {

    return (

        <div className="classement-table-container">

            <table className="classement-table">

                <thead>

                    <tr>

                        <th>الرتبة</th>

                        <th>الاسم الكامل</th>

                        <th>رقم مسار</th>

                        <th>تاريخ الازدياد</th>

                        <th>مكان الازدياد</th>

                        <th>الهاتف</th>

                        <th>البريد الإلكتروني</th>

                        <th>المؤسسة</th>

                        <th>شعبة البكالوريا</th>

                        <th>معدل البكالوريا</th>

                        <th>مسلك رياضة ودراسة</th>

                        <th>مؤسسة التعليم العالي</th>

                        <th>البطولات الوطنية</th>

                        <th>البطولات الدولية</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        candidats.length === 0 ?

                        (

                            <tr>

                                <td colSpan="14">

                                    لا توجد بيانات حاليا

                                </td>

                            </tr>

                        )

                        :

                        (

                            candidats.map((candidat,index)=>(

                                <tr key={candidat.id}>

                                    <td>{index+1}</td>

                                    <td>{candidat.nomComplet}</td>

                                    <td>{candidat.codeMassar}</td>

                                    <td>{candidat.dateNaissance}</td>

                                    <td>{candidat.lieuNaissance}</td>

                                    <td>{candidat.telephone}</td>

                                    <td>{candidat.email}</td>

                                    <td>{candidat.etablissement}</td>

                                    <td>{candidat.specialiteBac}</td>

                                    <td>{candidat.moyenneBac}</td>

                                    <td>{candidat.filiereSportEtude}</td>

                                    <td>{candidat.etablissementSup}</td>

                                    <td>

                                        {
                                            candidat.championnatsNationaux?.map((c,index)=>(

                                                <div key={index}>

                                                    {c.typeSport}
                                                    {" | "}
                                                    {c.saison}
                                                    {" | "}
                                                    {c.rang}
                                                    {" | "}
                                                    {c.lieu}

                                                </div>

                                            ))
                                        }

                                    </td>

                                    <td>

                                        {
                                            candidat.championnatsInternationaux?.map((c,index)=>(

                                                <div key={index}>

                                                    {c.typeSport}
                                                    {" | "}
                                                    {c.saison}
                                                    {" | "}
                                                    {c.rang}
                                                    {" | "}
                                                    {c.lieu}

                                                </div>

                                            ))
                                        }

                                    </td>

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}