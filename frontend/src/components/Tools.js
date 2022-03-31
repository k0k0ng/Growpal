import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import TopNavComponent from './TopNavComponent';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



export default function Tools(){

    const navigate = useNavigate(); 
    

    return (
        <Box component='div' sx={{ border:'1px solid red' }}>
            <TopNavComponent />

            { editMode ? _editMode() : _viewMode() }
        </Box>
    )
}

