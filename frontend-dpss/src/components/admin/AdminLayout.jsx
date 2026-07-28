import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (

        <div className="admin-layout">

            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            <div
                className={`admin-content ${
                    sidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
            >

                <Navbar />

                <main className="page-content">
                    {children}
                </main>

            </div>

        </div>

    );
}