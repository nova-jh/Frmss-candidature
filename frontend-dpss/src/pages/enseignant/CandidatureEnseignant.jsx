import { useState } from "react";

import HeaderEnseignant from "../../components/enseignant/HeaderEnseignant";
import GeneralInfoEnseignant from "../../components/enseignant/GeneralInfoEnseignant";
import ResultatsNationaux from "../../components/enseignant/ResultatsNationaux";
import candidatureEnseignantService from "../../services/candidatureEnseignantService";

import "./CandidatureEnseignant.css";

export default function CandidatureEnseignant() {

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

            alert("حدث خطأ أثناء الإرسال");

        }

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