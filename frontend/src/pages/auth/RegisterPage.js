import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function RegisterPage () {
    const navigate = useNavigate(); 

    const [email, setEmail] = useState(() => {
        return "";
    });
    const [first_name, setFirstName] = useState(() => {
        return "";
    });
    const [last_name, setLastName] = useState(() => {
        return "";
    });
    const [password, setPassword] = useState(() => {
        return "";
    });
    const [re_password, setRePassword] = useState(() => {
        return "";
    });

    function _handleEmailChange(e) {
        setEmail( prevValue => prevValue = e.target.value);
    }

    function _handleFirstNameChange(e) {
        setFirstName( prevValue => prevValue = e.target.value);
    }

    function _handleLastNameChange(e) {
        setLastName( prevValue => prevValue = e.target.value);
    }

    function _handlePasswordChange(e) {
        setPassword( prevValue => prevValue = e.target.value);
    }

    function _handleRePasswordChange(e) {
        setRePassword( prevValue => prevValue = e.target.value);
    }

    const _handleRegisterButtonPressed = async () => {
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
                re_password: re_password
            }),
        };

        fetch('/auth/users/', requestOptions)
        .then((response) => {
            if (response.ok){
                console.log("Sucess update.");
                navigate('/login')
            }else{
                console.log("Failed update.");
            }
        });
    }


    return (
        <Box component='div'>
            <Grid container spacing={1} style={{ marginTop:"100px" }}>
                <Grid item xs={12} align="center">
                    <Typography compenent="h4" variant="h4">
                        Create an account
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            Fill in all the forms.
                        </FormHelperText>
                        <TextField id="email" label="Email" variant="outlined" required onChange={_handleEmailChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField id="first_name" label="First Name" variant="outlined" required onChange={_handleFirstNameChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField id="last_name" label="Last Name" variant="outlined" required onChange={_handleLastNameChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField id="password1" label="Password" variant="outlined" required onChange={_handlePasswordChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField id="password2" label="Confirm Password" variant="outlined" required onChange={_handleRePasswordChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={_handleRegisterButtonPressed}>
                        Register
                    </Button>
                    <Button variant="contained" color="default" to="/" component={Link}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    
                </Grid>
            </Grid>
        </Box>
    );
    
}
    
