import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRouting from '../utils/PrivateRouting';
import { AuthProvider } from '.././context/AuthContext';

import AdminDashboardPage from './admin/AdminDashboardPage';
import CreateToolComponent from '../components/CreateToolComponent';
import ToolInfoComponent from '../components/ToolInfoComponent';
import HomePage from './user/HomePage';

import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ActivateAccount from './auth/ActivateAccount';
import ForgotPassword from './auth/ForgotPassword';
import EnterNewPassword from './auth/EnterNewPassword';

export default function RoutingPage() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Admin Pages */}
                    <Route path='/growpal-admin' element={<PrivateRouting><AdminDashboardPage/></PrivateRouting>} />
                    <Route path='/create-tool' element={<PrivateRouting><CreateToolComponent/></PrivateRouting>} />
                    

                    {/* User Pages */}
                    <Route exact path='/' element={<HomePage/>} />
                    <Route path='/view-tool/:toolID' element={<ToolInfoComponent />} />
                    

                    {/* Auth Pages */}
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/activate/:uid/:token' element={<ActivateAccount />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/password/reset/confirm/:uid/:token' element={<EnterNewPassword />} />
                </Routes>
            </AuthProvider>
        </Router>
    ); 
}