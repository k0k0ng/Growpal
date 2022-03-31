import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


const UserPrivateRouting = ({children}) => {
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
}

export default UserPrivateRouting;