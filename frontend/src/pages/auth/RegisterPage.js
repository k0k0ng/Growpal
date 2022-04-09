import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';

export default function RegisterPage () {
    const navigate = useNavigate(); 

    const [emailExists, setEmailExists] = useState(() => {return false;});
    const [weakPassword, setWeakPassword] = useState(() => {return false;});
    const [signingUp, setSigningUp] = useState(() => { return false; });
    const [alertInfo, setAlertInfo] = useState(() => { return ""; });
    const [showPassword, setShowPassword] = useState(() => { return false; });
    const [email, setEmail] = useState(() => { return ""; });
    const [name, setName] = useState(() => { return ""; });
    const [password, setPassword] = useState(() => { return ""; });
    const [re_password, setRePassword] = useState(() => { return ""; });

    function _handleEmailChange(e) {
        setEmail( prevValue => prevValue = e.target.value);
    }

    function _handleNameChange(e) {
        setName( prevValue => prevValue = e.target.value);
    }

    function _handlePasswordChange(e) {
        setPassword( prevValue => prevValue = e.target.value);
    }

    function _handleRePasswordChange(e) {
        setRePassword( prevValue => prevValue = e.target.value);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const _handleRegisterButtonPressed = async () => {
        
        if(email === "" || name === "" || password === "" || re_password === ""){
            setAlertInfo("Empty Field");
            return null;
        }

        fetch('/api/check-email-exists', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email
            }),
        }).then((res) => {
            if (res.status === 200){                
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: email,
                        name: name,
                        password: password,
                        re_password: re_password
                    }),
                };
        
                fetch('/auth/users/', requestOptions)
                .then((response) => {
                    if (response.ok){
                        localStorage.setItem('SignUpSuccess', true);
                        navigate('/login')
                    }else{
                        setWeakPassword(true);
                        setSigningUp(false);
                        return null;
                    }
                });
            }else{
                setEmailExists(true);
                setSigningUp(false);
                return null;
            }
        });

        setSigningUp(true);
    }


    const CloseAlert = () => {
        setAlertInfo("");
    }

    const ShowAlert = () => {     
        if(alertInfo === "Empty Field"){
            return (
                <Alert 
                    severity="error"
                    onClose={CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Error! Please fill in all fields.
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

    const SignUpButtonToShow = () => {
        if(signingUp){
            return (
                <LoadingButton
                    loading={signingUp}
                    loadingPosition="end"
                    endIcon={<SendIcon />}
                    sx={{ margin:'0px 2%' }}
                    className='contact-us-right-container-send-button-loading'
                >
                    Register
                </LoadingButton>
            )
        }else{
            return (
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={_handleRegisterButtonPressed} 
                    sx={{ margin:'0px 2%' }}
                    className='contact-us-right-container-send-button'
                >
                    Register
                </Button>
            )
        }
    }


    return (
        <Box component='div' sx={{ height:'100vh', display:'flex', alignItems:'center' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} align="center">
                    <Typography compenent="h1" variant="h3" sx={{ fontFamily:'Arvo', color:'#546263' }}>
                        Growpal
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography compenent="h4" variant="h4" className='register-header'>
                        Create an account
                    </Typography>
                </Grid>

                <Grid item xs={12} align="center" sx={{ minHeight:'60px' }}>
                    { ShowAlert() }
                </Grid>
                
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <TextField 
                            id="email" 
                            label="Email" 
                            variant="outlined" 
                            error={emailExists ? true : false}
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates' }} }
                            required
                            onChange={_handleEmailChange} 
                        />
                        <FormHelperText error={true} sx={{  display: { xs: emailExists ? 'block' : 'none' } }}>
                            Error! Invalid email. Email already exists.
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <TextField 
                            id="name" 
                            label="Name" 
                            variant="outlined"
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates' }} }
                            required 
                            onChange={_handleNameChange} 
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <InputLabel
                            sx={{ fontFamily:'Montserrat Alternates' }} 
                            htmlFor="outlined-adornment-password"
                        >Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            label="Password"
                            variant="outlined" 
                            type={showPassword ? 'text' : 'password'}
                            sx={{ fontFamily:'Montserrat Alternates' }} 
                            required
                            error={weakPassword ? true : false}
                            onChange={_handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={weakPassword ? true : false}>
                            Please a strong password. Weak password is not allowed.
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <InputLabel 
                            sx={{ fontFamily:'Montserrat Alternates' }} 
                            htmlFor="outlined-adornment-re-password"
                        >Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-re-password"
                            label="Confirm Password"
                            variant="outlined" 
                            type={showPassword ? 'text' : 'password'}
                            sx={{ fontFamily:'Montserrat Alternates' }} 
                            required
                            error={weakPassword ? true : false}
                            onChange={_handleRePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">

                    { SignUpButtonToShow() }
                    
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        to="/" 
                        disabled={ signingUp }
                        component={Link} 
                        sx={{ margin:'0px 2%' }}
                        className='contact-us-right-container-cancel-button'
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
    
}
    
