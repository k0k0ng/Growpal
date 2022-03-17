import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const FooterSection = {
    backgroundColor: '#546263',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0 10px 0'
}

const FooterText = {
    color: "#f3f4ed",
    fontSize: 12,
    fontFamily: 'Montserrat Alternates',
}

export default function FooterComponent () {
    return (    
        <Box style={FooterSection}>
            <Typography style={FooterText}>Copyright 2021-2022 by Growpal. All Rights Reserved.</Typography>
        </Box>
    );
    
}