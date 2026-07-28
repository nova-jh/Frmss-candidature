import "./Header.css";

function Header() {
    return (
        <header className="header">

            <div className="header-top">

                <img
                    src="/logo.png"
                    alt="Logo"
                    className="logo"
                />

                <div className="titles">

                    <h1 className="title-ar">
                        الجامعة الملكية المغربية للرياضة المدرسية
                    </h1>

                    <h2 className="title-fr">
                        FEDERATION ROYALE MAROCAINE DU SPORT SCOLAIRE
                    </h2>

                </div>

            </div>

            <div className="banner">

                بطاقة طلب الحصول على منحة التميز الدراسي والرياضي

            </div>

        </header>
    );
}

export default Header;