import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';

export default function RegisterPage () {
    const navigate = useNavigate(); 

    const [_alertInfo, setAlertInfo] = useState(() => { return ""; });
    const [_signingUp, setSigningUp] = useState(() => { return false; });
    const [_emailExists, setEmailExists] = useState(() => {return false;});
    const [_weakPassword, setWeakPassword] = useState(() => {return false;});
    const [_showPassword, setShowPassword] = useState(() => { return false; });

    const [_email, setEmail] = useState(() => { return ""; });
    const [_name, setName] = useState(() => { return ""; });
    const [_password, setPassword] = useState(() => { return ""; });
    const [_re_password, setRePassword] = useState(() => { return ""; });

    function _HandleEmailChange(e) {
        setEmail( prevValue => prevValue = e.target.value);
    }

    function _HandleNameChange(e) {
        setName( prevValue => prevValue = e.target.value);
    }

    function _HandlePasswordChange(e) {
        setPassword( prevValue => prevValue = e.target.value);
    }

    function _HandleRePasswordChange(e) {
        setRePassword( prevValue => prevValue = e.target.value);
    }

    const _HandleClickShowPassword = () => {
        setShowPassword(!_showPassword);
    };

    const _HandleRegisterButtonPressed = async () => {
        
        if(_email === "" || _name === "" || _password === "" || _re_password === ""){
            setAlertInfo("Empty Field");
            return null;
        }

        fetch('/api/check-email-exists', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: _email
            }),
        }).then((res) => {
            if (res.status === 200){                
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: _email,
                        name: _name,
                        password: _password,
                        re_password: _re_password
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


    const _CloseAlert = () => {
        setAlertInfo("");
    }

    const _ShowAlert = () => {     
        if(_alertInfo === "Empty Field"){
            return (
                <Alert 
                    severity="error"
                    onClose={_CloseAlert}
                    sx={{ width:'18.5%' }} 
                    className='register-fields'
                >
                    Error! Please fill in all fields.
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

    const _SignUpButtonToShow = () => {
        if(_signingUp){
            return (
                <LoadingButton
                    loading={_signingUp}
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
                    onClick={_HandleRegisterButtonPressed} 
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
            <Grid container spacing={3}>
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
                        Create an account
                    </Typography>
                </Grid>

                <Grid item xs={12} align="center" sx={{ minHeight:'60px' }}>
                    { _ShowAlert() }
                </Grid>
                
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <TextField 
                            id="email" 
                            label="Email" 
                            variant="outlined" 
                            error={_emailExists ? true : false}
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates' }} }
                            autoComplete='off'
                            required
                            onChange={_HandleEmailChange} 
                        />
                        <FormHelperText error={true} sx={{  display: { xs: _emailExists ? 'block' : 'none' } }}>
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
                            autoComplete='off'
                            required 
                            onChange={_HandleNameChange} 
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
                            type={_showPassword ? 'text' : 'password'}
                            sx={{ fontFamily:'Montserrat Alternates' }} 
                            autoComplete='off'
                            required
                            error={_weakPassword ? true : false}
                            onChange={_HandlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={_HandleClickShowPassword}
                                    edge="end"
                                    >
                                    {_showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={_weakPassword ? true : false} sx={{ display: _weakPassword ? "block" : "none"  }}>
                            Please enter a strong password.
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
                            type={_showPassword ? 'text' : 'password'}
                            sx={{ fontFamily:'Montserrat Alternates' }} 
                            autoComplete='off'
                            required
                            error={_weakPassword ? true : false}
                            onChange={_HandleRePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={_HandleClickShowPassword}
                                    edge="end"
                                    >
                                    {_showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} align="center">
                    { _SignUpButtonToShow() }
                </Grid>
                
                <Grid item xs={12} align="center">
                    <Button 
                        variant="text"
                        color="primary" 
                        to="/login" 
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
                        Already have an account? Sign In
                    </Button>
                </Grid>
                
            </Grid>
        </Box>
    );
    
}
    
