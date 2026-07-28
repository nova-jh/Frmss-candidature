import "./GeneralInfo.css";

function GeneralInfo({ formData, handleChange }) {
    return (
        <section className="form-section">

            <div className="section-title">
                1 - معلومات عامة
            </div>

            <div className="general-grid">

                <label>الاسم والنسب</label>

                <input
                    type="text"
                    name="nomComplet"
                    value={formData.nomComplet}
                    onChange={handleChange}
                />

                <label>رقم مسار</label>

                <input
                    type="text"
                    name="codeMassar"
                    value={formData.codeMassar}
                    onChange={handleChange}
                />

                <label>تاريخ الازدياد</label>

                <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                />

                <label>مكان الازدياد</label>

                <input
                    type="text"
                    name="lieuNaissance"
                    value={formData.lieuNaissance}
                    onChange={handleChange}
                />

                <label>رقم الهاتف</label>

                <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                />

                <label>البريد الإلكتروني</label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <label>المؤسسة</label>

                <input
                    type="text"
                    name="etablissement"
                    value={formData.etablissement}
                    onChange={handleChange}
                />

            </div>

        </section>
    );
}

export default GeneralInfo;