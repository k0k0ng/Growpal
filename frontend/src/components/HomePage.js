import React, { useState, useEffect } from 'react';
import TopNavComponent from './TopNavComponent';
import LoginPage from './LoginPage';
import AdminDashboardPage from './AdminDashboardPage';
import CreateToolComponent from './CreateToolComponent';
import Tools from './Tools';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route
} from "react-router-dom";
import { Typography } from '@material-ui/core';


export default function HomePage() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={
                    <div>
                        <TopNavComponent />
                        <Typography variant='h5' align="center">This is the Home Page</Typography>
                    </div>
                } />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/admin-dashboard' element={<AdminDashboardPage />} />
                <Route path='/create-tool' element={<CreateToolComponent />} />
                <Route path='/view-tool/:toolID' element={<Tools />} />
            </Routes>
        </Router>
    ); 
}