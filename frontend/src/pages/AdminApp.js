import React from "react";
import { render } from "react-dom";
import AdminDashboardPage from "./admin/AdminDashboardPage";

export default function AdminApp () {
    return (
        <div>
            <AdminDashboardPage />
        </div>
    );
}

const adminAppDiv = document.getElementById("adminApp");
render(<AdminApp />, adminAppDiv);