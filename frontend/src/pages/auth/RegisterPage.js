import React, { useState } from 'react';
import TopNavComponent from '../../components/TopNavComponent';
import { 
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
} from "@material-ui/core";
import { styled } from '@mui/material/styles';

import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function RegisterPage () {
    const navigate = useNavigate(); 

    const Input = styled('input')({
        display: 'none',
    });

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
            }else{
                console.log("Failed update.");
            }
        });

        // let formField = new FormData()
        // formField.append('email',email)
        // formField.append('username',username)
        // formField.append('password1',password1)
        // formField.append('password2',password2)

        // await Axios({
        //     method: 'POST',
        //     url:'/api/register-account-credentials',
        //     data: formField,
        //     xsrfCookieName: 'csrftoken',
        //     xsrfHeaderName: 'X-CSRFTOKEN',
        // }).then(response=>{
        //     navigate("/view-tool/"+response.data.id)
        // });
    }


    return (
        <div>
            <TopNavComponent />
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
                        <TextField id="password2" label="Repeat Password" variant="outlined" required onChange={_handleRePasswordChange} />
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
        </div>
    );
    
}
    
