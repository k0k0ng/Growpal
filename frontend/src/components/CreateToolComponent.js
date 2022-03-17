import React, { useState } from 'react';
import TopNavComponent from './TopNavComponent';
import { 
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
} from "@material-ui/core"

import { Link, useNavigate } from "react-router-dom"

export default function CreateToolComponent () {

    const navigate = useNavigate(); 

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [url, setUrl] = useState("");

    function _handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function _handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function _handleImageSourceChange(e) {
        setImg(e.target.value);
    }

    function _handleLinkChange(e) {
        setUrl(e.target.value);
    }

    function _handleSaveButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                description: description,
                img_src: img,
                url: url
            }),
        };
        fetch('/api/create-tools', requestOptions).then((response) => 
        response.json()).then((data) => navigate("/view-tool/"+data.id));
    }


    return (
    <div>
    <TopNavComponent />
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography compenent="h4" variant="h4">
                Create Tool    
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl component="fieldset">
                <FormHelperText>
                    Fill in all the forms.
                </FormHelperText>
                <TextField id="title" label="Title" variant="outlined" onChange={_handleTitleChange} />
            </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl component="fieldset">
                <TextField id="description" label="Description" variant="outlined" onChange={_handleDescriptionChange} />
            </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl component="fieldset">
                <TextField id="img_src" label="Image Source" variant="outlined" onChange={_handleImageSourceChange} />
            </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl component="fieldset">
                <TextField id="url" label="Link" variant="outlined" onChange={_handleLinkChange} />
            </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={_handleSaveButtonPressed}>
                Save
            </Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button variant="contained" color="default" to="/" component={Link}>
                Home
            </Button>
        </Grid>
    </Grid>
    </div>
    );
    
}