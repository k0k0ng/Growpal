import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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
        <Box component='div' sx={{ height:'100vh', display:'flex', alignItems:'center' }} >
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography compenent="h1" variant="h3" sx={{ fontFamily:'Arvo', color:'#546263', margin:'30px 0px' }}>
                        Growpal
                    </Typography>

                    <Typography variant="body1" sx={{ fontFamily:'Montserrat Alternates', color:'#434743', marginBottom:'50px' }}>
                        Press to continue activate account.
                    </Typography>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        className='contact-us-right-container-send-button'
                        sx={{ margin:'0px 1%' }}
                        onClick={activeClick}
                    >
                        Activate Account
                    </Button>
                </Grid>
                
            </Grid>
        </Box>  
    );
}
