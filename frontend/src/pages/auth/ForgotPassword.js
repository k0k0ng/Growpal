import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import SendIcon from '@mui/icons-material/Send';

export default function ForgotPassword () {
    const navigate = useNavigate(); 

    const [_loading, setLoading] = useState(() => { return false; });
    const [_alertInfo, setAlertInfo] = useState(() => { return ""; });
    const [_email, setEmail] = useState(() => { return "";});

    function _handleEmailChange(e) {
        setEmail( prevValue => prevValue = e.target.value);
    }

    const _handleResetButtonPressed = async () => {
        if(_email === ""){
            setAlertInfo("Failed");
            return null;
        }

        fetch('/api/check-email-exists', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: _email
            }),
        }).then((res) => {
            if (res.status === 203){                
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: _email,
                    }),
                };
        
                fetch('/auth/users/reset_password/', requestOptions)
                .then((response) => {
                    if (response.ok){
                        localStorage.setItem('PasswordResetSuccess', true);
                        setLoading(false);
                        navigate('/login')
                    }else{
                        setAlertInfo("Failed");
                        setLoading(false);
                    }
                });
            }else{
                setAlertInfo("Undifined");
                setLoading(false);
                return null;
            }
        });

    

        setLoading(true);
    }

    const _ShowAlert = () => {   
        if(_alertInfo === "Failed"){
            return (
                <Alert 
                    severity="error"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Error! Invalid email address.
                </Alert>
            );
        }

        if(_alertInfo === "Undifined"){
            return (
                <Alert 
                    severity="error"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Error! Email doesnt exists in database.
                </Alert>
            );
        }

        return null;
    }

    const _CloseAlert = () => {
        setAlertInfo("");
    }

    const _ResetButtonToShow = () => {
        if(_loading){
            return (
                <LoadingButton
                    loading={_loading}
                    loadingPosition="end"
                    endIcon={<SendIcon />}
                    className='contact-us-right-container-send-button-loading'
                >
                    Reset
                </LoadingButton>
            )
        }else{
            return (
                <Button 
                    variant="contained" 
                    color="primary" 
                    className='contact-us-right-container-send-button'
                    sx={{ margin:'0px 1%' }}
                    onClick={_handleResetButtonPressed}
                >
                    Reset
                </Button>
            )
        }
    }

    return (
        <Box component='div' sx={{ height:'100vh', display:'flex', alignItems:'center' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button 
                        variant="text"
                        sx={{ textTransform:'none' }}
                        to="/" 
                        component={Link}
                    >
                       <Typography compenent="h1" variant="h3" sx={{ fontFamily:'Arvo', color:'#546263' }}>
                            Growpal
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography compenent="h4" variant="h4" className='register-header'>
                        Forgot Password?
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" sx={{ minHeight:'60px', marginTop:'1%' }}>
                    { _ShowAlert() }
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <FormHelperText>
                            Enter your email to reset the password.
                        </FormHelperText>
                        <TextField 
                            id="email" 
                            label="Email" 
                            name='email' 
                            variant="outlined"
                            autoComplete='off'
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates' }} }
                            required 
                            onChange={_handleEmailChange} 
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" sx={{ marginTop:'2%' }} >
                    { _ResetButtonToShow() }
                </Grid>
                
            </Grid>
        </Box>
    );
    
}
    
