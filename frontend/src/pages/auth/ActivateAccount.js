import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Axios from 'axios';

export default function ActivateAccount () {
    const navigate = useNavigate();
    
    const { uid, token } = useParams();
    
    const activeClick = (e) => {
        Axios({
            method: 'POST',
            url:'/auth/users/activation/',
            data: { uid: uid, token: token },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
        }).then(() => {
            navigate('/login')
        })
        .catch(err => {
            alert(err.response);
        });
    };
    
    return (
        <div>
            <Button onClick={activeClick} color="primary">Activate Now</Button>
        </div>        
    );
}
