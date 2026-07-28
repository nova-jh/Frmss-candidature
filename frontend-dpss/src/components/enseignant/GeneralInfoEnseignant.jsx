export default function GeneralInfoEnseignant({

    formData,

    handleChange

}) {

    return (

        <section className="section">

            <div className="section-title">

                1. معلومات عامة

            </div>

            <div className="general-grid">

                <div className="field">

                    <label>

                        الاسم والنسب

                    </label>

                    <input
                        name="nomComplet"
                        value={formData.nomComplet}
                        onChange={handleChange}
                    />

                </div>

                <div className="field">

                    <label>

                        رقم التأجير

                    </label>

                    <input
                        name="numeroPpr"
                        value={formData.numeroPpr}
                        onChange={handleChange}
                    />

                </div>

                <div className="field">

                    <label>

                        رقم الهاتف

                    </label>

                    <input
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                    />

                </div>

                <div className="field">

                    <label>

                        البريد الإلكتروني

                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="field">

                    <label>

                        الإطار

                    </label>

                    <input
                        name="cadre"
                        value={formData.cadre}
                        onChange={handleChange}
                    />

                </div>

                <div className="field">

                    <label>

                        المؤسسة

                    </label>

                    <input
                        name="etablissement"
                        value={formData.etablissement}
                        onChange={handleChange}
                    />

                </div>

                <div className="field">

                    <label>

                        المديرية الإقليمية

                    </label>

                    <input
                        name="directionProvinciale"
                        value={formData.directionProvinciale}
                        onChange={handleChange}
                    />

                </div>

                <div className="field">

                    <label>

                        الأكاديمية

                    </label>

                    <input
                        name="academie"
                        value={formData.academie}
                        onChange={handleChange}
                    />

                </div>

            </div>

        </section>

    );

}