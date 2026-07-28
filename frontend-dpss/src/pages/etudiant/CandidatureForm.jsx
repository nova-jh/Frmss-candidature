import { useState } from "react";

import "../../App.css";

import Header from "../../components/layout/Header";

import GeneralInfo from "../../components/form/GeneralInfo";

import AcademicInfo from "../../components/form/AcademicInfo";

import DynamicTable from "../../components/form/DynamicTable";

import SportSection from "../../components/form/SportSection";

import candidatureService from "../../services/candidatureService";



function CandidatureForm() {

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
        alert("حدث خطأ أثناء إرسال الطلب.");
      }
    };

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