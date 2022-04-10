import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import AuthContext from '../../context/AuthContext';

import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import SendIcon from '@mui/icons-material/Send';

export default function LoginPage () {
    const navigate = useNavigate();
    const {setAuthTokens, setUser} = useContext(AuthContext);

    const [_logginIn, setLogginIn] = useState(() => { return false; });
    const [_alertInfo, setAlertInfo] = useState(() => { return ""; });
    const [_email, setEmail] = useState(() => { return ""; });
    const [_password, setPassword] = useState(() => { return ""; });

    useEffect(() =>{
        if(localStorage.getItem('SignUpSuccess')){
            setAlertInfo("Signing Up Success")
            return null;
        }

        if(localStorage.getItem('ActivateSuccess')){
            setAlertInfo("Activating Success")
            return null;
        }

        if(localStorage.getItem('ActivateFailed')){
            setAlertInfo("Activating Failed")
            return null;
        }

        if(localStorage.getItem('PasswordResetSuccess')){
            setAlertInfo("Reset Success")
            return null;
        }
    },[])

    function _HandleEmailChange(e) {
        setEmail( prevValue => prevValue = e.target.value);
    }

    function _HandlePasswordChange(e) {
        setPassword( prevValue => prevValue = e.target.value);
    }

    const _HandleSignInButtonPressed = async (e) => {
        if(_email === "") {
            setAlertInfo("Empty Email");
            return null;
        }

        if(_password === "") {
            setAlertInfo("Empty Password");
            return null;
        }

        const response = await fetch('/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: _email,
                password: _password,
            })
        }).catch((e)=>{
            setAlertInfo("Invalid Credentials");
            return null;
        })
        
        if(response.status === 200){
            const data = await response.json();

            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        }else{
            setAlertInfo("Invalid Credentials");
        }
        
    }

    const _CloseAlert = () => {
        setAlertInfo("");
    }

    const _ShowAlert = () => {   
        if(_alertInfo === "Signing Up Success"){
            localStorage.removeItem('SignUpSuccess');
            return (
                <Alert 
                    severity="success"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Create account successful. Please check your email to activate account.
                </Alert>
            );
        }  

        if(_alertInfo === "Activating Success"){
            localStorage.removeItem('ActivateSuccess');
            return (
                <Alert 
                    severity="success"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Account activated successfuly.
                </Alert>
            );
        } 

        if(_alertInfo === "Reset Success"){
            localStorage.removeItem('PasswordResetSuccess');
            return (
                <Alert 
                    severity="success"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Please check you email for password reset confirmation.
                </Alert>
            );
        }

        if(_alertInfo === "Activating Failed"){
            localStorage.removeItem('ActivateFailed');
            return (
                <Alert 
                    severity="warning"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Activating account failed. Account might be already activated. 
                </Alert>
            );
        } 

        if(_alertInfo === "Invalid Credentials"){
            return (
                <Alert 
                    severity="error"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Incorrect email or password.
                </Alert>
            );
        }

        if(_alertInfo === "Empty Email"){
            return (
                <Alert 
                    severity="error"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Error! Email can't be empty.
                </Alert>
            );
        }

        if(_alertInfo === "Empty Password"){
            return (
                <Alert 
                    severity="error"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Error! Password can't be empty.
                </Alert>
            );
        }

        return null;
    }

    const _SignInButtonToShow = () => {
        if(_logginIn){
            return (
                <LoadingButton
                    loading={_logginIn}
                    loadingPosition="end"
                    endIcon={<SendIcon />}
                    className='contact-us-right-container-send-button-loading'
                >
                    Sign In
                </LoadingButton>
            )
        }else{
            return (
                <Button 
                    variant="contained" 
                    color="primary" 
                    className='contact-us-right-container-send-button'
                    sx={{ margin:'0px 1%' }}
                    onClick={_HandleSignInButtonPressed}
                >
                    Sign In
                </Button>
            )
        }
    }

    return (
        <Box component='div' sx={{ height:'100vh', display:'flex', alignItems:'center' }} >
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
                        Sign In
                    </Typography>
                </Grid>
                
                <Grid item xs={12} align="center" sx={{ minHeight:'60px' }}>
                    { _ShowAlert() }
                </Grid>
                

                <Grid item xs={12} align="center" sx={{ margin:'1% 0px' }}>
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <TextField 
                            id="email" 
                            label="Email" 
                            name='email' 
                            value={_email || ''} 
                            variant="outlined" 
                            autoComplete='off'
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates' }} }
                            required 
                            onChange={_HandleEmailChange} 
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" sx={{ margin:'1% 0px' }}>
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <TextField 
                            id="Password"
                            label="Password" 
                            type="password"
                            name='password' 
                            variant="outlined" 
                            autoComplete='off'
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates' }} }
                            required 
                            onChange={_HandlePasswordChange} 
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} align="center" >
                    { _SignInButtonToShow() }
                </Grid>

                <Grid item xs={12} align="center" sx={{ margin:'2% 0 2% 0px' }}>
                    <Button 
                        variant="text"
                        color="primary" 
                        to="/register" 
                        sx={{ 
                            fontSize:'12px',
                            fontFamily:'Montserrat Alternates', 
                            textTransform:'none',
                            color:'#c06115', 
                            borderRadius: '25px',
                            margin:'0px 25px'
                        }}
                        component={Link}
                        className='custom-button-text'
                    >
                        Don't have an account? Sign Up
                    </Button>

                    <Button 
                        variant="text"
                        color="primary" 
                        to="/forgot-password" 
                        sx={{ 
                            fontSize:'12px',
                            fontFamily:'Montserrat Alternates', 
                            textTransform:'none',
                            color:'#c06115',  
                            borderRadius: '25px',
                            margin:'0px 25px'
                        }}
                        component={Link}
                        className='custom-button-text'
                    >
                        Forgot Password?
                    </Button>
                </Grid>
                
            </Grid>
        </Box>

    );
    
}
    
