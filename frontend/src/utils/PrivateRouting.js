import React from 'react';
import { Navigate } from 'react-router-dom'


const PrivateRouting = ({children}) => {

    let auth = true;

    return auth ? children: <Navigate to="/login" />;
}

export default PrivateRouting;