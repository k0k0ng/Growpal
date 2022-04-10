import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';

export default function ContactUsComponent(){
    
    const form = useRef();
    const [_sendResult, setSendResult] = useState(() => { return ""; });
    const [_loading, setLoading] = useState(() => { return false; });

    const _SendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_h0yi24a', 'template_73pygbh', form.current, '_53QZqaTZdEKmoM4r')
        .then((result) => {
            console.log(result.text);
            setSendResult("Success");
            e.target.reset();
            setLoading(false);
        }, (error) => {
            console.log(error.text);
            setSendResult("Failed");
            setLoading(false);
        });

        setLoading(true);
    };

    const _CloseAlert = () => {
        setSendResult("");
    }

    const _ShowAlert = () => {
        if(_sendResult === "Success"){
            return (
                <Alert 
                    className='contact-us-input-field'
                    onClose={_CloseAlert}
                >
                    Message sent.
                </Alert>
            );
        }
        
        if(_sendResult === "Failed"){
            return (
                <Alert 
                    severity="error"
                    className='contact-us-input-field'
                    onClose={_CloseAlert}
                >
                    Sending message failed.
                </Alert>
            );
        }

        return null;
    }

    
    const _ShowSendButton = () => {
        if(_loading){
            return (
                <LoadingButton
                    endIcon={<SendIcon />}
                    loading={_loading}
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
                        onSubmit={_SendEmail}
                    >
                        
                        <TextField 
                            id="outlined-basic" 
                            label="Name" 
                            variant="outlined" 
                            name='Name'
                            InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                            InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                            disabled={_loading ? true : false}
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
                            disabled={_loading ? true : false}
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
                            disabled={_loading ? true : false}
                            required
                            className='contact-us-input-field'
                        />

                        { _ShowAlert() }
                        
                        <Box>
                            { _ShowSendButton() }
                        </Box>
                    </form>
                    
                </Grid>
                
            </Grid>
        </Box>
    )
}

