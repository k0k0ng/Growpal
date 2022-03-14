import React from 'react';
import TopNavComponent from './TopNavComponent';
import { Typography } from '@material-ui/core';

export default function AdminDashboardPage() {

    return (
        <div>
            <TopNavComponent />
            <Typography variant='h5' align='center'>This is the Admin Dashboard Page</Typography>
        </div>
    );
    
}