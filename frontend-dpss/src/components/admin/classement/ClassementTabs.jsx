import { useEffect, useState } from "react";
import "./ClassementTabs.css";
import ClassementTable from "./ClassementTable";
import classementService from "../../../services/classementService";
import excelService from "../../../services/excelService";


export default function ClassementTabs() {

    const [activeTab, setActiveTab] = useState("moyenne");
    const [candidats, setCandidats] = useState([]);

    useEffect(()=>{
        let cancelled = false;

        async function chargerClassement(){
            try{
                let response;
                switch(activeTab){
                    case "moyenne":
                        response = await classementService.getClassementMoyenne();
                        break;
                    case "national":
                        response = await classementService.getClassementNational();
                        break;
                    case "international":
                        response = await classementService.getClassementInternational();
                        break;
                    default:
                        response = await classementService.getClassementMoyenne();
                }
                if (!cancelled) {
                    setCandidats(response.data);
                }
            }
            catch(error){
                console.error(error);
            }
        }

        chargerClassement();
        return () => {
            cancelled = true;
        };
    },[activeTab]);


    async function exporterExcel(){
        try{
            const response = await excelService.exportExcel(activeTab);
            const url = window.URL.createObjectURL( new Blob([response.data]));
            const link =document.createElement("a");
            link.href = url;
            link.download = "classement.xlsx";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        }
        catch(error){
            console.error(error);
            alert("Erreur lors de l'export.");
        }
    
    }

    return (

        <div className="classement-section">

            <h2 className="classement-title">

                ترتيب المترشحين

            </h2>

            <div className="tabs">

                <button
                    className={activeTab === "moyenne" ? "active" : ""}
                    onClick={() => setActiveTab("moyenne")}
                >
                    حسب المعدل
                </button>

                <button
                    className={activeTab === "national" ? "active" : ""}
                    onClick={() => setActiveTab("national")}
                >
                    حسب البطولات الوطنية
                </button>

                <button
                    className={activeTab === "international" ? "active" : ""}
                    onClick={() => setActiveTab("international")}
                >
                    حسب البطولات الدولية
                </button>

            </div>

            <div className="export-container">

                <button className="excel-btn" onClick={exporterExcel} >

                    📥 تصدير Excel

                </button>

            </div>
            <ClassementTable
                 candidats={candidats}
            />

        </div>

    );

}
