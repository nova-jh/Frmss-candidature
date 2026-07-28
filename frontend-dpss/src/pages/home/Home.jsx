import { Link } from "react-router-dom";
import "./Home.css";
import { FaGraduationCap } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import ministereLogo from "../../assets/ministry.png";
import dpssLogo from "../../assets/frmssLogo.jpg";

export default function Home() {

    return (

        <div className="home">

            <header className="home-header">
                <div className="logos">
                    <img src={ministereLogo} alt="Ministère"/>
                    <img src={dpssLogo} alt="DPSS" />
                </div>

                <h1>

                    مديرية الارتقاء بالرياضة المدرسية

                </h1>

                <p>

                    منصة تدبير طلبات الترشيح

                </p>

            </header>

            <div className="cards">

                <div className="card">

                    <div className="icon">
                        <FaGraduationCap />
                    </div>

                    <h2>

                        بطاقة طلب الحصول على منحة التميز الدراسي والرياضي

                    </h2>

                    <Link to="/etudiant">

                        <button>

                            الدخول إلى الاستمارة

                        </button>

                    </Link>

                </div>

                <div className="card">

                    <div className="icon">
                        <FaMedal />
                    </div>

                    <h2>

                        بطاقة الترشيح لجوائز التميز الخاصة بالأساتذة

                    </h2>

                    <Link to="/enseignant">
                    <button>
                         الدخول إلى الاستمارة
                    </button>
                    </Link>

                </div>

                <div className="card">

                    <div className="icon">
                        <MdAdminPanelSettings />
                    </div>

                    <h2>

                        فضاء الإدارة

                    </h2>

                    <Link to="/admin/login">

                        <button>

                            تسجيل الدخول

                        </button>

                    </Link>

                </div>

            </div>
            <footer className="footer">
                © 2026 - مديرية الارتقاء بالرياضة المدرسية
            </footer>

        </div>

    );

}