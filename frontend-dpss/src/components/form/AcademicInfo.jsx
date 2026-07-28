import "./AcademicInfo.css";

function AcademicInfo({ formData, handleChange }) {

    return (

        <section className="form-section">

            <div className="section-title">

                2 - معلومات حول المسار الدراسي

            </div>

            <div className="general-grid">

                <label>
                    تخصص البكالوريا المحصل عليها 2025/2026
                </label>

                <input
                    type="text"
                    name="specialiteBac"
                    value={formData.specialiteBac}
                    onChange={handleChange}
                />

                <label>
                    المعدل العام في البكالوريا 2025/2026
                </label>

                <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="20"
                    name="moyenneBac"
                    value={formData.moyenneBac}
                    onChange={handleChange}
                />

                <label>

                    المسار التعليمي

                </label>

                <div className="radio-container">

                    <label className="radio-label">

                        <input
                            type="radio"
                            name="filiereSportEtude"
                            value="GENERAL"
                            checked={formData.filiereSportEtude === "GENERAL"}
                            onChange={handleChange}
                        />

                        عام

                    </label>

                    <label className="radio-label">

                        <input
                            type="radio"
                            name="filiereSportEtude"
                            value="SPORT_ETUDE"
                            checked={formData.filiereSportEtude === "SPORT_ETUDE"}
                            onChange={handleChange}
                        />

                        مسلك "رياضة ودراسة"

                    </label>

                </div>

                <label>

                    المؤسسة الجامعية التي تم التسجيل فيها في موسم 2026/2027

                </label>

                <input
                    type="text"
                    name="etablissementSup"
                    value={formData.etablissementSup}
                    onChange={handleChange}
                />

            </div>

        </section>

    );

}

export default AcademicInfo;