import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboardPage from './admin/AdminDashboardPage';
import CreateToolComponent from '../components/CreateToolComponent';
import ToolInfoComponent from '../components/ToolInfoComponent';
import HomePage from './user/HomePage';

import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ActivateAccount from './auth/ActivateAccount';

export default function RoutingPage() {
    return (
        <Router>
            <Routes>
                {/* Admin Pages */}
                <Route path='/growpal-admin' element={<AdminDashboardPage />} />
                <Route path='/create-tool' element={<CreateToolComponent />} />

                {/* User Pages */}
                <Route exact path='/' element={<HomePage />} />
                <Route path='/view-tool/:toolID' element={<ToolInfoComponent />} />
                

                {/* Auth Pages */}
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/activate/:uid/:token' element={<ActivateAccount />} />
            </Routes>
        </Router>
    ); 
}