import { useEffect, useState } from "react";

import "../../App.css";

import Header from "../../components/layout/Header";

import GeneralInfo from "../../components/form/GeneralInfo";

import AcademicInfo from "../../components/form/AcademicInfo";

import DynamicTable from "../../components/form/DynamicTable";

import SportSection from "../../components/form/SportSection";

import candidatureService from "../../services/candidatureService";
import applicationSettingsService from "../../services/applicationSettingsService";
import "../../styles/applicationStatus.css";



function CandidatureForm() {

    const [applicationsOpen, setApplicationsOpen] = useState(null);

    const [formData, setFormData] = useState({

        nomComplet: "",

        codeMassar: "",

        dateNaissance: "",

        lieuNaissance: "",

        telephone: "",

        email: "",

        etablissement: "",

        specialiteBac:"",

        moyenneBac:"",

        filiereSportEtude:"",

        etablissementSup:"",
    });
    const [championnatsInternationaux, setChampionnatsInternationaux] = useState([{
        saison:"",
        typeSport:"",
        rang:"",
        lieu:""
    }]);
    const [championnatsNationaux, setChampionnatsNationaux] = useState([{
        saison:"",
        typeSport:"",
        rang:"",
        lieu:""
    }]);

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

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    const envoyerCandidature = async () => {
      const candidature = {
        ...formData,
        championnatsInternationaux,
        championnatsNationaux
      };
      try {
        await candidatureService.creerCandidature(candidature);
        alert("تم إرسال الطلب بنجاح.");
      }catch(error){
        console.error(error);
        alert(error.response?.status === 403
          ? "باب الترشيحات مغلق حاليا."
          : "حدث خطأ أثناء إرسال الطلب.");
      }
    };

    if (applicationsOpen === null) {
        return <div className="app"><Header /></div>;
    }

    if (!applicationsOpen) {
        return (
            <div className="app">
                <Header />
                <div className="application-status-message">
                    <h2>باب الترشيحات مغلق حاليا</h2>
                    <p>سيتم الإعلان عن موعد فتح باب الترشيحات للموسم المقبل.</p>
                </div>
            </div>
        );
    }

    return (

        <div className="app">

            <Header />

            <GeneralInfo
                formData={formData}
                handleChange={handleChange}
            />

            <AcademicInfo 
                formData={formData} 
                handleChange={handleChange}
            />

            <SportSection />
            <DynamicTable
                title="البطولات الرياضية المدرسية القارية والدولية"
                rows={championnatsInternationaux}
                setRows={setChampionnatsInternationaux}
            />
            
            <DynamicTable
                title="البطولات الرياضية المدرسية الوطنية"
                rows={championnatsNationaux}
                setRows={setChampionnatsNationaux}
            />

            <div className="submit-container">
              <button
                  className="submit-btn"
                  onClick={envoyerCandidature}
              >
                 إرسال الطلب
              </button>
            </div>
        </div>

       

    );

}

export default CandidatureForm;
