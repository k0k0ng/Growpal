import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import SendIcon from '@mui/icons-material/Send';


export default function ContactUsComponent(){
    const [sendResult, setSendResult] = useState(() => { return ""; });
    const form = useRef();
    const [loading, setLoading] = useState(() => { return false; });

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_h0yi24a', 'template_73pygbh', form.current, '_53QZqaTZdEKmoM4r')
        .then((result) => {
            console.log(result.text);
            setSendResult("Success");
            setLoading(false);
        }, (error) => {
            console.log(error.text);
            setSendResult("Failed");
            setLoading(false);
        });

        e.target.reset();
        setLoading(true);
    };

    const CloseAlert = () => {
        setSendResult("");
    }

    const ShowAlert = () => {
        if(sendResult === "Success"){
            return (
                <Alert 
                    className='contact-us-input-field'
                    onClose={CloseAlert}
                >
                    Message sent.
                </Alert>
            );
        }
        
        if(sendResult === "Failed"){
            return (
                <Alert 
                    severity="error"
                    className='contact-us-input-field'
                    onClose={CloseAlert}
                >
                    Sending message failed.
                </Alert>
            );
        }

        return null;
    }

    
    const ShowSendButton = () => {
        if(loading){
            return (
                <LoadingButton
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    className='contact-us-right-container-send-button-loading'
                >
                    Send
                </LoadingButton>
            )
        }else{
            return (
                <Button className='contact-us-right-container-send-button' type="submit">
                    Send
                </Button>
            )
        }
    }

    return (
        <Box component="div" className='contact-us-div'>
            <Grid container>
                <Grid item className='contact-us-left-container' md={6} >
                    <Box component='div'>
                        <Typography 
                            variant='h1'
                            component='h2' 
                            noWrap
                            className='contact-us-left-container-header'
                        >
                            Need help?
                        </Typography>
                        <Typography component='p' className='contact-us-left-container-sub-header'>
                            Tell us your concerns whether you're curious about certain features, pricing, or even bundle deals.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }} className='contact-icons'>
                            <IconButton href={"https://www.linkedin.com"} aria-label="menu">
                                <LinkedInIcon sx={{ fontSize: 34, color: '#434743' }} />
                            </IconButton>
                            <IconButton href={"https://facebook.com"} aria-label="menu">
                                <FacebookIcon sx={{ fontSize: 34, color: '#434743' }} />
                            </IconButton>
                            <IconButton href={"https://gmail.com"} aria-label="menu">
                                <MailIcon sx={{ fontSize: 34, color: '#434743' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
                <Grid item className='contact-us-right-container' md={6}>
                    <form
                        style={{ width: '100%' }}
                        ref={form} 
                        autoComplete="off"
                        onSubmit={sendEmail}
                    >
                        
                        <TextField 
                            id="outlined-basic" 
                            label="Name" 
                            variant="outlined" 
                            name='Name'
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                            required
                            className='contact-us-input-field'
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined"
                            name='Email' 
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                            required
                            className='contact-us-input-field'
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Message"
                            name='Message'
                            multiline
                            rows={4}
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                            required
                            className='contact-us-input-field'
                        />

                        { ShowAlert() }
                        
                        <Box>
                            { ShowSendButton() }
                        </Box>
                    </form>
                    
                </Grid>
                
            </Grid>
        </Box>
    )
}

