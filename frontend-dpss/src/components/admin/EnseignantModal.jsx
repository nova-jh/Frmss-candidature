import "./EnseignantModal.css";

export default function EnseignantModal({

    open,

    enseignant,

    onClose

}) {

    if (!open || !enseignant) return null;

    return (

        <div className="enseignant-modal-overlay">

            <div className="enseignant-modal-content" dir="rtl">

                <button
                    className="enseignant-modal-close"
                    type="button"
                    onClick={onClose}
                    aria-label="Fermer la fenêtre"
                >
                    ✖
                </button>

                <h2>

                    تفاصيل طلب الأستاذ

                </h2>

                <div className="enseignant-modal-section">

                    <p><strong>الاسم الكامل :</strong> {enseignant.nomComplet}</p>

                    <p><strong>رقم التأجير :</strong> {enseignant.numeroPpr}</p>

                    <p><strong>رقم الهاتف :</strong> {enseignant.telephone}</p>

                    <p><strong>البريد الإلكتروني :</strong> {enseignant.email}</p>

                    <p><strong>الإطار :</strong> {enseignant.cadre}</p>

                    <p><strong>المؤسسة :</strong> {enseignant.etablissement}</p>

                    <p><strong>المديرية الإقليمية :</strong> {enseignant.directionProvinciale}</p>

                    <p><strong>الأكاديمية :</strong> {enseignant.academie}</p>

                </div>

                <h3 className="enseignant-modal-subtitle">

                    الإنجازات

                </h3>

                <table className="enseignant-modal-table">

                    <thead>

                        <tr>

                            <th>الموسم الدراسي</th>

                            <th>الرياضة</th>

                            <th>الرتبة</th>

                            <th>المكان</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            enseignant.resultats?.map((r,index)=>(

                                <tr key={index}>

                                    <td>{r.saison}</td>

                                    <td>{r.sport}</td>

                                    <td>{r.classement}</td>

                                    <td>{r.lieu}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}
