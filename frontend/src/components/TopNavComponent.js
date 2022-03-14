import React, {useState} from 'react';
import { Grid, Button, ButtonGroup, TextField} from "@material-ui/core"
import { Link, useNavigate } from "react-router-dom"


export default function TopNavComponent () {
    const navigate = useNavigate(); 
    const [toolID, setToolID] = useState(() => {
        return "";
    });

    function _viewToolBtnPressed(){
        navigate("/view-tool/"+toolID)
    }

    function _setToolID(e){
        setToolID( prevValue => prevValue = e.target.value);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <ButtonGroup variant='contained'>
                    <Button color='secondary' to="/" component={Link}>Home</Button>
                    <Button color='primary' to="/login" component={Link}>Login</Button>
                    <Button color='secondary' to="/admin-dashboard" component={Link}>Admin Dashboard</Button>
                    <Button color='primary' to="/create-tool" component={Link}>Create Tool</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField label="Tool ID" variant="outlined" onChange={_setToolID}/>
                <Button variant='contained' color='default' size='large' onClick={_viewToolBtnPressed}>View Tool</Button>
            </Grid>
        </Grid>
    );
    
}