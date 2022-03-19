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
import axios from 'axios';

export default function RegisterPage () {
    const navigate = useNavigate(); 

    const Input = styled('input')({
        display: 'none',
    });

    const [email, setEmail] = useState(() => {
        return "";
    });
    const [username, setUsername] = useState(() => {
        return "";
    });
    const [password1, setPassword1] = useState(() => {
        return "";
    });
    const [password2, setPassword2] = useState(() => {
        return "";
    });

    function _handleEmailChange(e) {
        setEmail( prevValue => prevValue = e.target.value);
    }

    function _handleUsernameChange(e) {
        setUsername( prevValue => prevValue = e.target.value);
    }

    function _handlePassword1Change(e) {
        setPassword1( prevValue => prevValue = e.target.value);
    }

    function _handlePassword2Change(e) {
        setPassword2( prevValue => prevValue = e.target.value);
    }

    const _handleRegisterButtonPressed = async () => {
        let formField = new FormData()
        formField.append('email',email)
        formField.append('username',username)
        formField.append('password1',password1)
        formField.append('password2',password2)

        await axios({
            method: 'POST',
            url:'/api/register-account-credentials',
            data: formField,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
        }).then(response=>{
            navigate("/view-tool/"+response.data.id)
        });
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
                        <TextField id="username" label="Username" variant="outlined" required onChange={_handleUsernameChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField id="password1" label="Password" variant="outlined" required onChange={_handlePassword1Change} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField id="password2" label="Repeat Password" variant="outlined" required onChange={_handlePassword2Change} />
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
    
