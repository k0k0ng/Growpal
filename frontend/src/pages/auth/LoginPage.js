import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import AuthContext from '../../context/AuthContext';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function LoginPage () {
    const navigate = useNavigate();
    const {setAuthTokens, setUser} = useContext(AuthContext);

    const [email, setEmail] = useState(() => {
        return "";
    });
    const [password, setPassword] = useState(() => {
        return "";
    });

    function _handleEmailChange(e) {
        setEmail( prevValue => prevValue = e.target.value);
    }

    function _handlePasswordChange(e) {
        setPassword( prevValue => prevValue = e.target.value);
    }

    const _handleSignInButtonPressed = async (e) => {

        const response = await fetch('/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: email,
                password: password,
            })
        })
        
        if(response.status === 200){
            const data = await response.json();

            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        }else{
            alert('Something went wrong!');
        }
        
    }


    return (
        <Box component='div' sx={{ height:'100vh', display:'flex', alignItems:'center' }} >
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography compenent="h4" variant="h4" className='register-header' sx={{ margin:'2% 0px' }}>
                        Sign In
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" sx={{ margin:'1% 0px' }}>
                    <FormControl component="fieldset" sx={{ width:'20%' }} className='register-fields'>
                        <TextField 
                            id="email" 
                            label="Email" 
                            name='email' 
                            value={email || ''} 
                            variant="outlined" 
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
                            id="password" 
                            label="Password" 
                            name='password' 
                            variant="outlined" 
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
                        sx={{ fontFamily:'Montserrat Alternates' }}
                        component={Link}
                    >
                        Forgot Password
                    </Button>
                </Grid>
                <Grid item xs={12} align="center" >
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className='contact-us-right-container-send-button'
                        sx={{ margin:'0px 1%' }}
                        onClick={_handleSignInButtonPressed}
                    >
                        Sign In
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className='contact-us-right-container-send-button' 
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
    
