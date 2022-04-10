import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from '.././context/AuthContext';

import AdminPrivateRoutings from '../utils/AdminPrivateRoutings';
import UserPrivateRouting from '../utils/UserPrivateRouting';
import NoAuthRoutings from '../utils/NoAuthRoutings'

import AdminDashboardPage from './admin/AdminDashboardPage';
import CreateToolComponent from '../components/CreateToolComponent';

import UserProfilePage from './user/UserProfilePage';

import HomePage from './user/HomePage';
import ToolInfoPage from './user/ToolInfoPage';
import BlogPage from './user/BlogPage';
import BlogInfoPage from './user/BlogInfoPage';

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
                    <Route path='/growpal-admin' element={<AdminPrivateRoutings><AdminDashboardPage/></AdminPrivateRoutings>} />
                    <Route path='/create-tool' element={<AdminPrivateRoutings><CreateToolComponent/></AdminPrivateRoutings>} />
                    

                    {/* User Pages */}
                    <Route exact path='/' element={<HomePage/>} />
                    <Route path='/view-tool/:toolID' element={<ToolInfoPage />} />
                    <Route path='/blog' element={<BlogPage />} />
                    <Route path='/blog/:blogID' element={<BlogInfoPage />} />
                    
                    {/* User Private Pages */}
                    <Route path='/profile' element={<UserPrivateRouting><UserProfilePage/></UserPrivateRouting>} />

                    {/* Strictly No Auth Pages */}
                    <Route path='/login' element={<NoAuthRoutings> <LoginPage /> </NoAuthRoutings>} />
                    <Route path='/register' element={<NoAuthRoutings> <RegisterPage/> </NoAuthRoutings>} />
                    <Route path='/activate/:uid/:token' element={<NoAuthRoutings> <ActivateAccount /> </NoAuthRoutings>} />
                    <Route path='/forgot-password' element={<NoAuthRoutings> <ForgotPassword /> </NoAuthRoutings>} />
                    <Route path='/password/reset/confirm/:uid/:token' element={<NoAuthRoutings> <EnterNewPassword /> </NoAuthRoutings>} />
                </Routes>
            </AuthProvider>
        </Router>
    ); 
}