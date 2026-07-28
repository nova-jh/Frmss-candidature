import ministereLogo from "../../assets/ministry.png";
import dpssLogo from "../../assets/frmssLogo.jpg";

export default function HeaderEnseignant() {

    return (

        <div className="enseignant-header">

            <div className="logos">

                <img
                    src={ministereLogo}
                    alt=""
                    className="logo-left"
                />

                <img
                    src={dpssLogo}
                    alt=""
                    className="logo-right"
                />

            </div>

            <div className="header-title">

                <h2>
                    بطاقة الترشيح لجوائز التميز الخاصة بالأساتذة
                </h2>

                <h3>
                    الحاصلين على المراتب الثلاثة الأولى
                    في البطولات الوطنية للرياضة المدرسية
                </h3>

                <h3>
                    خلال المواسم الدراسية التالية
                </h3>

                <h1>
                    2025-2026 / 2026-2027
                </h1>

            </div>

        </div>

    );

}