import dpssLogo from "../../assets/frmssLogo.jpg";

export default function HeaderEnseignant() {

    return (

        <div className="enseignant-header">

            <div className="logos">
                <img
                    src={dpssLogo}
                    alt="Logo FRMSS"
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

                <h1 dir="ltr">
                    2025-2026 / 2024-2025 / 2023-2024
                </h1>

            </div>

        </div>

    );

}
