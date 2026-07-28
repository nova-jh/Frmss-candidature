import "./CandidatureModal.css";

export default function CandidatureModal({ open, onClose, candidature }) {

    if (!open || !candidature) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-content" dir="rtl">

                <div className="modal-header">

                    <h2>تفاصيل طلب الترشيح</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="modal-body">

                    <div className="info-row">
                        <strong>الاسم الكامل :</strong>
                        <span>{candidature.nomComplet}</span>
                    </div>

                    <div className="info-row">
                        <strong>رمز مسار :</strong>
                        <span>{candidature.codeMassar}</span>
                    </div>

                    <div className="info-row">
                        <strong>تاريخ الازدياد :</strong>
                        <span>{candidature.dateNaissance}</span>
                    </div>

                    <div className="info-row">
                        <strong>مكان الازدياد :</strong>
                        <span>{candidature.lieuNaissance}</span>
                    </div>

                    <div className="info-row">
                        <strong>الهاتف :</strong>
                        <span>{candidature.telephone}</span>
                    </div>

                    <div className="info-row">
                        <strong>البريد الإلكتروني :</strong>
                        <span>{candidature.email}</span>
                    </div>

                    <div className="info-row">
                        <strong>المؤسسة :</strong>
                        <span>{candidature.etablissementSup}</span>
                    </div>

                    <div className="info-row">
                        <strong>شعبة البكالوريا :</strong>
                        <span>{candidature.specialiteBac}</span>
                    </div>

                    <div className="info-row">
                        <strong>معدل البكالوريا :</strong>
                        <span>{candidature.moyenneBac}</span>
                    </div>

                    <div className="info-row">
                        <strong>المسلك الرياضي :</strong>
                        <span>{candidature.filiereSportEtude}</span>
                    </div>

                </div>

            </div>

        </div>

    );

}
