import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


const AdminPrivateRoutings = ({children}) => {
    const {user} = useContext(AuthContext);

    return user && user.is_staff && user.is_superuser ? children : <Navigate to="/" />;
}

export default AdminPrivateRoutings;