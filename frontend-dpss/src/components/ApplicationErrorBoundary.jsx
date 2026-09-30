import { Component } from "react";

export default class ApplicationErrorBoundary extends Component {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    render() {
        if (this.state.failed) {
            return (
                <main className="application-status-message" role="alert">
                    <h1>تعذر عرض الصفحة</h1>
                    <p lang="fr" dir="ltr">Une erreur empêche l’affichage. Actualisez la page ou revenez à l’accueil.</p>
                    <button type="button" className="submit-btn" onClick={() => window.location.reload()}>Actualiser / تحديث</button>
                    <p><a href="/">Accueil / الصفحة الرئيسية</a></p>
                </main>
            );
        }
        return this.props.children;
    }
}
