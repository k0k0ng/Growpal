import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboardPage from './admin/AdminDashboardPage';
import CreateToolComponent from '../components/CreateToolComponent';
import ToolInfoComponent from '../components/ToolInfoComponent';
import LoginPage from './auth/LoginPage';
import HomePage from './user/HomePage';

export default function RoutingPage() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/create-tool' element={<CreateToolComponent />} />
                <Route path='/view-tool/:toolID' element={<ToolInfoComponent />} />
                <Route path='/growpal-admin' element={<AdminDashboardPage />} />
            </Routes>
        </Router>
    ); 
}