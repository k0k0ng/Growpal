import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
} from "@material-ui/core";


export default function ForgotPassword () {
    const navigate = useNavigate(); 

    const [email, setEmail] = useState(() => {
        return "";
    });

    function _handleEmailChange(e) {
        setEmail( prevValue => prevValue = e.target.value);
    }

    const _handleResetButtonPressed = async () => {
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
            }),
        };

        fetch('/auth/users/reset_password/', requestOptions)
        .then((response) => {
            if (response.ok){
                console.log("Reset password confirmation sent.");
                navigate('/login')
            }else{
                console.log("Reset Password Failed.");
            }
        });
    }


    return (
        <div>
            <Grid container spacing={1} style={{ marginTop:"100px" }}>
                <Grid item xs={12} align="center">
                    <Typography compenent="h4" variant="h4">
                        Forgot Password
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            Please enter email to reset password.
                        </FormHelperText>
                        <TextField id="email" label="Email" variant="outlined" required onChange={_handleEmailChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" >
                    <Button variant="contained" color="primary" onClick={_handleResetButtonPressed}>
                        Reset
                    </Button>
                </Grid>
                
            </Grid>
        </div>
    );
    
}
    
