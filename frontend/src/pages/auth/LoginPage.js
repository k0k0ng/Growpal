import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
} from "@material-ui/core";
import AuthContext from '../../context/AuthContext';
import jwt_decode from "jwt-decode";


export default function LoginPage () {
    const navigate = useNavigate();
    const {user, setAuthTokens, setUser} = useContext(AuthContext);

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

        e.preventDefault()
        let response = await fetch('/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: email,
                password: password,
            })
        })


        let data = await response.json()
        
        
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))

            let another_response = await fetch('/api/get-user-bookmarked-tools', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email: email
                })
            });

            let account_details = await another_response.json()
            navigate('/')
        }else{
            alert('Something went wrong!')
        }
        
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         email: email,
        //         password: password,
        //     }),
        // };

        // let responseData = fetch('/api/token/', requestOptions);
        // let dAtA = await (await responseData).json()
        // console.log("Access: "+dAtA.access);
        // console.log("Refresh: "+dAtA.refresh);
    }


    return (
        <div>
            <Grid container spacing={1} style={{ marginTop:"100px" }}>
                <Grid item xs={12} align="center">
                    <Typography compenent="h4" variant="h4">
                        Sign In
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            Fill in all the forms.
                        </FormHelperText>
                        <TextField id="email" label="Email" name='email' value={email || ''} variant="outlined" required onChange={_handleEmailChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField id="password" label="Password" name='password' variant="outlined" required onChange={_handlePasswordChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" >
                    <Button variant="text" color="primary" to="/forgot-password" component={Link}>
                        Forgot Password
                    </Button>
                </Grid>
                <Grid item xs={12} align="center" >
                    <Button variant="contained" color="primary" onClick={_handleSignInButtonPressed}>
                        Sign In
                    </Button>
                    <Button variant="contained" color="default" to="/" component={Link}>
                        Cancel
                    </Button>
                </Grid>
                
            </Grid>
        </div>
    );
    
}
    
