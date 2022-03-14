import React from 'react';
import TopNavComponent from './TopNavComponent';
import { Typography } from '@material-ui/core';

export default function LoginPage () {

    return (
    <div>
        <TopNavComponent />
        <div id="loginDiv">
            <Typography variant="h5" align="center">This is the Login Page</Typography>
        </div>
    </div>
    );
    
}