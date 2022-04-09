import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import AuthContext from '../../context/AuthContext';

import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

import SendIcon from '@mui/icons-material/Send';



export default function LoginPage () {
    const navigate = useNavigate();
    const {setAuthTokens, setUser} = useContext(AuthContext);

    const [logginIn, setLogginIn] = useState(() => { return false; });
    const [alertInfo, setAlertInfo] = useState(() => { return (localStorage.getItem('SignUpSuccess') ? "Signing Up Success" : ""); });
    const [email, setEmail] = useState(() => { return ""; });
    const [password, setPassword] = useState(() => { return ""; });

    function _handleEmailChange(e) {
        setEmail( prevValue => prevValue = e.target.value);
    }

    function _handlePasswordChange(e) {
        setPassword( prevValue => prevValue = e.target.value);
    }

    const _handleSignInButtonPressed = async (e) => {
        if(email === "") {
            setAlertInfo("Empty Email");
            return null;
        }

        if(password === "") {
            setAlertInfo("Empty Password");
            return null;
        }

        const response = await fetch('/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: email,
                password: password,
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

    const CloseAlert = () => {
        setAlertInfo("");
    }

    const ShowAlert = () => {   
        if(alertInfo === "Signing Up Success"){
            localStorage.removeItem('SignUpSuccess');
            return (
                <Alert 
                    severity="success"
                    onClose={CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Create account successful. Please check your email to activate account.
                </Alert>
            );
        }  

        if(alertInfo === "Invalid Credentials"){
            return (
                <Alert 
                    severity="error"
                    onClose={CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Incorrect email or password.
                </Alert>
            );
        }

        if(alertInfo === "Empty Email"){
            return (
                <Alert 
                    severity="error"
                    onClose={CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Error! Email can't be empty.
                </Alert>
            );
        }

        if(alertInfo === "Empty Password"){
            return (
                <Alert 
                    severity="error"
                    onClose={CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Error! Password can't be empty.
                </Alert>
            );
        }

        return null;
    }

    const SignInButtonToShow = () => {
        if(logginIn){
            return (
                <LoadingButton
                    loading={logginIn}
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
                    onClick={_handleSignInButtonPressed}
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
                    <Typography compenent="h1" variant="h3" sx={{ fontFamily:'Arvo', color:'#546263' }}>
                        Growpal
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography compenent="h4" variant="h4" className='register-header' sx={{ margin:'2% 0px 1% 0px' }}>
                        Sign In
                    </Typography>
                </Grid>
                
                <Grid item xs={12} align="center" sx={{ minHeight:'60px' }}>
                    { ShowAlert() }
                </Grid>
                

                <Grid item xs={12} align="center" sx={{ margin:'1% 0px' }}>
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <TextField 
                            id="email" 
                            label="Email" 
                            name='email' 
                            value={email || ''} 
                            variant="outlined" 
                            autoComplete='off'
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates' }} }
                            required 
                            onChange={_handleEmailChange} 
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
                            onChange={_handlePasswordChange} 
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" sx={{ margin:'0 0 2% 0px' }}>
                    <Button 
                        variant="text"
                        color="primary" 
                        to="/forgot-password" 
                        sx={{ fontFamily:'Montserrat Alternates', color:'#c06115', padding: '10px 45px', borderRadius: '25px' }}
                        component={Link}
                        className='custom-button-text'
                    >
                        Forgot Password
                    </Button>
                </Grid>
                <Grid item xs={12} align="center" >
                    
                    { SignInButtonToShow() }
                    
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className='contact-us-right-container-cancel-button' 
                        sx={{ margin:'0px 1%' }}
                        to="/" 
                        component={Link}
                    >
                        Cancel
                    </Button>
                </Grid>
                
            </Grid>
        </Box>

    );
    
}
    
