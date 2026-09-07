import { useEffect, useState } from "react";

import HeaderEnseignant from "../../components/enseignant/HeaderEnseignant";
import GeneralInfoEnseignant from "../../components/enseignant/GeneralInfoEnseignant";
import ResultatsNationaux from "../../components/enseignant/ResultatsNationaux";
import candidatureEnseignantService from "../../services/candidatureEnseignantService";
import applicationSettingsService from "../../services/applicationSettingsService";
import "../../styles/applicationStatus.css";

import "./CandidatureEnseignant.css";

export default function CandidatureEnseignant() {

    const [applicationsOpen, setApplicationsOpen] = useState(null);

    const [formData, setFormData] = useState({

        nomComplet: "",
        numeroPpr: "",
        telephone: "",
        email: "",
        cadre: "",
        etablissement: "",
        directionProvinciale: "",
        academie: "",

        resultats: [
            {
                saison: "",
                sport: "",
                classement: "",
                lieu: ""
            }
        ]

    });

    useEffect(() => {
        let cancelled = false;
        applicationSettingsService.getStatus()
            .then((response) => {
                if (!cancelled) setApplicationsOpen(response.data.open);
            })
            .catch(() => {
                if (!cancelled) setApplicationsOpen(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    function handleResultatChange(index, field, value) {

        const nouveaux = [...formData.resultats];

        nouveaux[index][field] = value;

        setFormData({
            ...formData,
            resultats: nouveaux
        });

    }

    function ajouterLigne() {

        setFormData({

            ...formData,

            resultats: [

                ...formData.resultats,

                {
                    saison: "",
                    sport: "",
                    classement: "",
                    lieu: ""
                }

            ]

        });

    }

    function supprimerLigne(index) {

        if (formData.resultats.length === 1) return;

        const nouveaux = formData.resultats.filter(
            (_, i) => i !== index
        );

        setFormData({
            ...formData,
            resultats: nouveaux
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await candidatureEnseignantService.envoyer(formData);

            alert("تم إرسال الطلب بنجاح");

        }

        catch (error) {

            console.error(error);

            alert(error.response?.status === 403
                ? "باب الترشيحات مغلق حاليا"
                : "حدث خطأ أثناء الإرسال");

        }

    }

    if (applicationsOpen === null) {
        return <div className="enseignant-page"><HeaderEnseignant /></div>;
    }

    if (!applicationsOpen) {
        return (
            <div className="enseignant-page">
                <HeaderEnseignant />
                <div className="application-status-message">
                    <h2>باب الترشيحات مغلق حاليا</h2>
                    <p>سيتم الإعلان عن موعد فتح باب الترشيحات للموسم المقبل.</p>
                </div>
            </div>
        );
    }

    return (

        <div className="enseignant-page">

            <HeaderEnseignant />

            <form
                className="enseignant-form"
                onSubmit={handleSubmit}
            >

                <GeneralInfoEnseignant

                    formData={formData}

                    handleChange={handleChange}

                />

                <ResultatsNationaux

                    resultats={formData.resultats}

                    handleResultatChange={handleResultatChange}

                    ajouterLigne={ajouterLigne}

                    supprimerLigne={supprimerLigne}

                />

                <div className="submit-zone">

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        إرسال الطلب
                    </button>

                </div>

            </form>

        </div>

    );

}
