import "./Navbar.css";

export default function Navbar() {

    const date = new Date().toLocaleDateString("fr-FR");

    return (

        <header className="admin-navbar" dir="rtl">

            <div className="navbar-right">

                <h2>لوحة الإدارة</h2>

                <p>مديرية النهوض بالرياضة المدرسية</p>

            </div>

            <div className="navbar-left">

                <div className="date-box">

                    📅 {date}

                </div>

                <div className="admin-avatar">

                    👤

                </div>

            </div>

        </header>

    );

}