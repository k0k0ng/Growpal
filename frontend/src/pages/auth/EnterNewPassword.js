import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function EnterNewPassword () {
    const navigate = useNavigate(); 
    const { uid, token } = useParams();

    const [password, setPassword] = useState(() => {
        return "";
    });

    const [password2, setPassword2] = useState(() => {
        return "";
    });


    function _handlePasswordChange(e) {
        setPassword( prevValue => prevValue = e.target.value);
    }

    function _handlePassword2Change(e) {
        setPassword2( prevValue => prevValue = e.target.value);
    }

    const _handleSaveNewPasswordButtonPressed = async () => {
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                uid: uid, 
                token: token,
                new_password: password,
                re_new_password: password2,
            }),
        };

        fetch('/auth/users/reset_password_confirm/', requestOptions)
        .then((response) => {
            if (response.ok){
                console.log("Password Reset Succes.");
                navigate('/')
            }else{
                console.log("Password Reset Failed.");
            }
        }).catch(err => {
            alert(err.response);
        });
    }


    return (
        <Box component='div'>
            <Grid container spacing={1} style={{ marginTop:"100px" }}>
                <Grid item xs={12} align="center">
                    <Typography compenent="h4" variant="h4">
                        Password Reset
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            Enter new password
                        </FormHelperText>
                        <TextField id="password" label="Password" variant="outlined" required onChange={_handlePasswordChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField id="password2" label="Re-enter Password" variant="outlined" required onChange={_handlePassword2Change} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" >
                    <Button variant="contained" color="primary" onClick={_handleSaveNewPasswordButtonPressed}>
                        Save
                    </Button>
                </Grid>
                
            </Grid>
        </Box>
    );
    
}
    
