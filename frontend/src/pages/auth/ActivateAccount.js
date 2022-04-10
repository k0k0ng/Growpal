import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import SendIcon from '@mui/icons-material/Send';

export default function ActivateAccount () {
    const navigate = useNavigate();
    
    const { uid, token } = useParams();
    const [_activatingAccount, setActivatingAccount] = useState(() => { return false; });

    const _ActiveButtonClicked = () => {
        Axios({
            method: 'POST',
            url:'/auth/users/activation/',
            data: { uid: uid, token: token },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
        }).then(() => {
            setActivatingAccount(false);
            localStorage.setItem('ActivateSuccess', true);
            navigate('/login');
        })
        .catch(err => {
            setActivatingAccount(false);
            localStorage.setItem('ActivateFailed', true);
            navigate('/login');
        });

        setActivatingAccount(true);
    };
    
    const _ActivateButtonToShow = () => {
        if(_activatingAccount){
            return (
                <LoadingButton
                    loading={_activatingAccount}
                    loadingPosition="end"
                    endIcon={<SendIcon />}
                    className='contact-us-right-container-send-button-loading'
                >
                    Activate Account
                </LoadingButton>
            )
        }else{
            return (
                <Button 
                    variant="contained" 
                    color="primary" 
                    className='contact-us-right-container-send-button'
                    sx={{ margin:'0px 1%' }}
                    onClick={_ActiveButtonClicked}
                >
                    Activate Account
                </Button>
            )
        }
    }

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

                    {_ActivateButtonToShow()}
                </Grid>
                
            </Grid>
        </Box>  
    );
}
