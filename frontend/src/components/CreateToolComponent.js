import React, { useState } from 'react';
import TopNavComponent from './TopNavComponent';
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

export default function CreateToolComponent () {
    const navigate = useNavigate(); 

    const Input = styled('input')({
        display: 'none',
    });

    const [title, setTitle] = useState(() => {
        return "";
    });
    const [description, setDescription] = useState(() => {
        return "";
    });
    const [image, setImage] = useState(() => {
        return null;
    });
    const [url, setUrl] = useState(() => {
        return "";
    });

    function _handleTitleChange(e) {
        setTitle( prevValue => prevValue = e.target.value);
    }

    function _handleDescriptionChange(e) {
        setDescription( prevValue => prevValue = e.target.value);
    }

    function _handleImageSourceChange(e) {
        setImage( prevValue => prevValue = e.target.files[0]);
    }

    function _handleLinkChange(e) {
        setUrl( prevValue => prevValue = e.target.value);
    }

    const _handleSaveButtonPressed = async () => {
        let formField = new FormData()
        formField.append('title',title)
        formField.append('description',description)
        formField.append('url',url)

        if(image !== null) {
            formField.append('image', image)
        }

        await axios({
            method: 'POST',
            url:'/api/create-tool',
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
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={_handleImageSourceChange} />
                        <Button variant="contained" color='primary' component="span">
                            Upload
                        </Button>
                    </label>
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