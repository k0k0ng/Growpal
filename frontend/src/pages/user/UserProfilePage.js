import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';
import AuthContext from '../../context/AuthContext';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Divider from'@mui/material/Divider';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

const ToolCardHeader = () => {
    const navigate = useNavigate();
    const {user, userBookmark ,setUserBookmark} = useContext(AuthContext);
    const {enqueueSnackbar} = useSnackbar();
    let _BookmarkedTools = [];
    
    let [_pageNumber, setPageNumber] = useState(() => { return 0; });
    let [_toolsPerPage, setToolsPerPage] = useState(() => { return 10; });
    const _pagesVisited = _pageNumber * _toolsPerPage;
    const _pageCount = Math.ceil(userBookmark.length / _toolsPerPage);

    useEffect(()=> {
        if(!userBookmark) return;
        _BookmarkedTools = [];
        userBookmark.map((item) => {
            _BookmarkedTools.push(item)
        })
    }, [userBookmark])

    const _ChangePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const _GetUserBookmarkedTools = async () => {
        let response = await fetch('/api/get-user-bookmarked-tools',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: user.email
            })
        })
        if(response.status === 204) {
            setUserBookmark([]);
            return;
        }
        
        let data = await response.json();
        
        if(response.status === 200){
            setUserBookmark(data);
        }else{
            alert('Bookmark is empty!');
            setUserBookmark();
        }
    }

    const _BookmarkActionLoggedInUser = (variant) => {
        if(variant === "success"){
            enqueueSnackbar('Tool added to bookmark.', { variant, autoHideDuration: 3000 });
        }else{
            enqueueSnackbar('Tool removed from bookmark.', { variant, autoHideDuration: 3000 });
        }
        
    };

    const _BookmarkActionNotLoggedInUser = (variant) => {
        enqueueSnackbar('Please loggin to bookmark a tool.', { variant, autoHideDuration: 3000 });
    };

    const _HandleAddBookmarkButtonPressed = (tool_ID) => {
        if(!user){
            _BookmarkActionNotLoggedInUser('error')
            return
        }

        fetch('/api/add-remove-tool-to-bookmark',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                tool_ID: tool_ID,
                user_Email: user.email,
            })
        }).then((response) => {

            if(response.status === 404) return;
            
            if(response.status === 201) _BookmarkActionLoggedInUser('success');
            if(response.status === 200) _BookmarkActionLoggedInUser('info');

            _GetUserBookmarkedTools()        
        });
    }

    const _DisplayPagination = () => {
        if(userBookmark.length > 0){
            return (
                <Grid item xs={12} maxHeight="100px" sx={{ alignSelf: 'end' }}>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={_pageCount}
                        onPageChange={_ChangePage}
                        containerClassName={"pagination-buttons-profile"}
                        nextLinkClassName={"pagination-next-button"}
                        previousLinkClassName={"pagination-previous-button"}
                        disabledClassName={"pagination-disabled"}
                        activeClassName={"pagination-active"}
                    />
                </Grid>
            )
        }

        return null;
    }

    return (
            <Grid 
                container 
                spacing={4}
                minHeight='400px'
                width={'100%'}
                sx={{ margin:'0', padding:'0px 5% 4% 5%' }}
            >
                {userBookmark.slice(_pagesVisited, _pagesVisited + _toolsPerPage).map((tool) => {
                    
                    return <Grid item 
                                key={tool.id} 
                                xl={2.35}
                                lg={2.91}
                                md={3.85}
                                sm={5.65}
                                xs={11}
                            >
                                <Card sx={{ maxWidth: 345, backgroundColor:'#546263', color:'#f3f4ed', border:'1px solid #f3f4ed', borderRadius:3 }} elevation={0}>
                                    <CardHeader
                                        avatar={
                                            <Tooltip title="Remove bookmark" placement="right-start">
                                                <IconButton aria-label="settings" sx={{ marginLeft:'12px', marginTop:'-3px' , padding:'0px', borderRadius:'0px'}}>
                                                    <BookmarkIcon sx={{fontSize:'35px', padding:'0px', color:'#c06115'}}  />          
                                                </IconButton>
                                            </Tooltip> 
                                        }
                                        sx={{
                                            position:'absolute',
                                            padding:'0px',
                                            zIndex:'1999'
                                        }}
                                        onClick={() => _HandleAddBookmarkButtonPressed (tool.id)}
                                    />

                                    <CardActionArea sx={{ minHeight:350, padding:'40px 20px 0px 20px' }} onClick={() => {navigate("/view-tool/"+tool.id)}} className='card-action-area'>
                                        <img alt="Tool Image" src={ '/static' + tool.image } className='tool-image' />
                                        <CardContent sx={{marginBottom:'20px'}}>
                                            <Typography gutterBottom variant="h6" component="div" align='center' className='tool-title'>
                                                { tool.title }
                                            </Typography>
                                            <Typography variant="body2" sx={{ }} className='tool-description'>
                                                { tool.description }
                                            </Typography>
                                        </CardContent>
                                        <CardContent>
                                            {tool.categories.map((tool_category) => (
                                                <Chip key={tool_category.id} label={tool_category.name} className='tool-category-chip' />
                                            ))} 
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                })}

                { _DisplayPagination() }
                
            </Grid>
        
    );
}

export default function UserProfilePage(){
    const {user, UserAccountName, UserAccountImage, resetUser, setResetUser} = useContext(AuthContext);

    const [_hasChanges, setHasChanges] = useState(() => {return false;});
    const [_NameField, setNameField] = useState(() => {return "";});
    const [_uploadedPhoto, setUploadedPhoto] = useState(() => {return null;});
    const [_openEditName, setOpenEditName] = useState(() => {return false;});
    const [_openUploadPhoto, setOpenUploadPhoto] = useState(() => {return false;});

    const [_HasAlert, setHasAlert] = useState(() => { return "";});
    const [_ShowSaveChangesConfirmation, setShowSaveChangesConfirmation] = useState(false);
    const [_ShowCancelConfirmation, setShowCancelConfirmation] = useState(false);

    const [_PanelToShow, setPanelToShow] = useState(() => { 
        if(localStorage.getItem('PanelToShow')){
            return localStorage.getItem('PanelToShow');
        }

        return "Bookmark";
    })

    useEffect(()=> {
        localStorage.removeItem('PanelToShow');
    }, [_PanelToShow])

    useEffect(() => {
        setNameField(UserAccountName)
    }, [UserAccountName])

    useEffect(() => {
        _RenderToUploadImagePreview()
    },[_uploadedPhoto])

    const _ShowEditName = () => {
        setOpenEditName(!_openEditName);
    };
    const _ShowUploadPhoto = () => {
        setOpenUploadPhoto(!_openUploadPhoto);
    };

    const _ChangeNameField = (e) => {
        setHasChanges(true);
        setNameField(e.target.value);
    }

    const _ChangeUploadPhoto = (e) => {
        setHasChanges(true);
        setUploadedPhoto(prevValue => prevValue = e.target.files[0]);
    }

    const _CancelChangeConfirmed = () => {
        setHasChanges(false);
        setNameField(UserAccountName);
        setOpenEditName(false);
        setUploadedPhoto(null);
        setOpenUploadPhoto(false);
        setShowCancelConfirmation(false);
    }

    const _ShowCancelConfirmationOpen = () => {
        setShowCancelConfirmation(true);
    };

    const _ShowCancelConfirmationClose = () => {
        setShowCancelConfirmation(false);
    };

    const _SaveChangesConfirmed = () => {
        let formField = new FormData()
        formField.append('email', user.email)
        formField.append('name', _NameField !== "" ? _NameField : user.name)

        let imageToUpload = "";
        if(UserAccountImage !== null) imageToUpload = UserAccountImage.slice(8);
        if(_uploadedPhoto !== null) imageToUpload = _uploadedPhoto;
        formField.append('display_image', imageToUpload)
        
        axios({
            method: 'PATCH',
            url:'/api/update-account-name-image',
            data: formField,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
        }).then(response=>{
            setResetUser(!resetUser);
            if(response.status === 200){
                setHasAlert("Success");
            }else{
                setHasAlert("Failed");
            }
            
        });

        setHasChanges(false);
        setNameField(UserAccountName);
        setOpenEditName(false);
        setUploadedPhoto(null);
        setOpenUploadPhoto(false);
        setShowSaveChangesConfirmation(false);
    }


    const _ShowSaveChangesConfirmationOpen = () => {
        setShowSaveChangesConfirmation(true);
    };

    const _ShowSaveChangesConfirmationClose = () => {
        setShowSaveChangesConfirmation(false);
    };
    
    const _DisplaySaveCancelButton = () => {
        if(_hasChanges){
            return (
                <Grid item xs={12} sx={{ display:'flex', justifyContent:'center', marginTop:'2%' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className='contact-us-right-container-send-button'
                        sx={{ margin:'0px 1%' }}
                        onClick={_ShowSaveChangesConfirmationOpen}
                    >
                        Save
                    </Button>
                    <Box component='div'>
                        <Dialog
                            open={_ShowSaveChangesConfirmation}
                            onClose={_ShowSaveChangesConfirmationClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title" sx={{ padding:'4%' }}>
                                {"Update Confirmation"}
                            </DialogTitle>
                            <DialogContent
                                sx={{ minWidth:'500px' }}
                            >
                                <DialogContentText id="alert-dialog-description" textAlign='center'>
                                    Continue save changes?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={_ShowSaveChangesConfirmationClose}>Disagree</Button>
                                <Button 
                                    className='contact-us-right-container-send-button' 
                                    onClick={_SaveChangesConfirmed} 
                                    autoFocus
                                >
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className='contact-us-right-container-send-button' 
                        sx={{ margin:'0px 1%' }}
                        onClick={_ShowCancelConfirmationOpen}
                    >
                        Cancel
                    </Button>
                    <Box component='div'>
                        <Dialog
                            open={_ShowCancelConfirmation}
                            onClose={_ShowCancelConfirmationClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title" sx={{ padding:'4%' }}>
                                {"Cancel Confirmation"}
                            </DialogTitle>
                            <DialogContent
                                sx={{ minWidth:'500px' }}
                            >
                                <DialogContentText id="alert-dialog-description" textAlign='center'>
                                    Continue discard changes?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={_ShowCancelConfirmationClose}>Disagree</Button>
                                <Button 
                                    className='contact-us-right-container-send-button' 
                                    onClick={_CancelChangeConfirmed} 
                                    autoFocus
                                >
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Grid>
            )
        }else{
            return (
                <Grid item xs={12} sx={{ display:'flex', justifyContent:'center', marginTop:'2%' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className='contact-us-right-container-send-button'
                        sx={{ margin:'0px 1%' }}
                        disabled
                    >
                        Save
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className='contact-us-right-container-send-button' 
                        sx={{ margin:'0px 1%' }}
                        disabled
                    >
                        Cancel
                    </Button>
                </Grid>
            )
        }
    }   

    const _BookmarkPanel = () => {
        return (
            <SnackbarProvider maxSnack={3} className='snackbar-custom-style'>
                <ToolCardHeader />
            </SnackbarProvider>
        )
    }

    const _SettingsPanel = () => {
        return (
            <Grid 
                container 
                justifyContent='center'
                sx={{ marginTop:'2%' }}
            >
                <Grid item container justifyContent='center' xs={12}>
                    <Grid item xs={10} md={6} lg={4}>
                        { _ShowAlert() }
                    </Grid>
                </Grid>
                <Grid item xs={10} md={6} lg={4} sx={{ display:'flex', justifyContent:'center', margin:'1% 0 5% 0'  }}>
                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper', borderRadius:'5px'}}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader" sx={{ fontFamily:'Montserrat Alternates', borderRadius:'5px' }}>
                                Account Info
                            </ListSubheader>
                        }
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <EmailRoundedIcon sx={{ color:'#c06115' }} />
                            </ListItemIcon>
                            <ListItemText primary={user.email} primaryTypographyProps={{ fontFamily:'Montserrat Alternates' }} />
                        </ListItemButton>

                        <ListItemButton onClick={_ShowEditName}>
                            <ListItemIcon>
                                <AssignmentIndRoundedIcon sx={{ color:'#c06115' }} />
                            </ListItemIcon>
                            <ListItemText primary={UserAccountName} primaryTypographyProps={{ fontFamily:'Montserrat Alternates' }} />
                            {_openEditName ? <ExpandLess sx={{ color:'#546263' }} /> : <ExpandMore sx={{ color:'#546263' }} />}
                        </ListItemButton>
                        <Collapse in={_openEditName} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4, pr: 4 }}>
                                <FormControl component="fieldset" sx={{ width:'100%' }}>
                                    <TextField 
                                        id="name" 
                                        label="Name" 
                                        name='name' 
                                        value={_NameField} 
                                        variant="outlined" 
                                        autoComplete='off'
                                        InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                                        InputLabelProps={{ style: { fontFamily:'Montserrat Alternates' }} }
                                        required 
                                        onChange={_ChangeNameField} 
                                    />
                                </FormControl>
                            </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={_ShowUploadPhoto}>
                            <ListItemIcon>
                                <ImageRoundedIcon sx={{ color:'#c06115' }} />
                            </ListItemIcon>
                            <ListItemText primary="Change Profile" primaryTypographyProps={{ fontFamily:'Montserrat Alternates' }} />
                            {_openUploadPhoto ? <ExpandLess sx={{ color:'#546263' }} /> : <ExpandMore sx={{ color:'#546263' }} />}
                        </ListItemButton>
                        <Collapse in={_openUploadPhoto} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Grid item xs={12} align="center">
                                    {_RenderToUploadImagePreview()}
                                    <Typography 
                                        variant="body2" 
                                        sx={{ fontFamily:'Montserrat Alternates' }}
                                    >
                                        { _uploadedPhoto ? _uploadedPhoto.name : "Upload Image"}
                                    </Typography>
                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={_ChangeUploadPhoto} />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera sx={{color:'#c06115'}}  />
                                        </IconButton>
                                    </label>
                                </Grid>
                            </ListItemButton>
                            </List>
                        </Collapse>
                        
                    </List>

                </Grid>
                
                {_DisplaySaveCancelButton()}
                
            </Grid>
        )
    }

    const _ShowAlert = () => {   
        if(_HasAlert === "Success"){
            return (
                <Alert severity="success" onClose={_CloseAlert}>
                    Account updated successfuly.
                </Alert>
            );
        }  

        if(_HasAlert === "Failed"){
            return (
                <Alert severity="error" onClose={_CloseAlert}>
                    Something went wrong! Updating account failed.
                </Alert>
            );
        }

        return null;
    }

    const _CloseAlert = () => {
        setHasAlert("");
    }

    const _BookmarkMenuActive = () => {
        return (
            <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                <Button onClick={() => { setPanelToShow("Bookmark"); }} variant="text" sx={{ fontFamily:'Montserrat Alternates', color:'#f3f4ed', height:'50px', borderRadius:'0px', padding:'0px 45px', borderBottom:'2px solid #c06115' }} elevation={0}>Bookmarks</Button>
                <Divider orientation="vertical" sx={{ height:'30px', background:'#f3f4ed' }} />
                <Button onClick={() => { setPanelToShow("Settings"); }} variant="text" sx={{ fontFamily:'Montserrat Alternates', color:'#f3f4ed', height:'50px', borderRadius:'0px', padding:'0px 45px' }}>Settings</Button>
            </Box>
        )
    }

    const _SettingsMenuActive = () => {
        return (
            <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                <Button onClick={() => { setPanelToShow("Bookmark"); }} variant="text" sx={{ fontFamily:'Montserrat Alternates', color:'#f3f4ed', height:'50px', borderRadius:'0px', padding:'0px 45px' }} >Bookmarks</Button>
                <Divider orientation="vertical" sx={{ height:'30px', background:'#f3f4ed' }} />
                <Button onClick={() => { setPanelToShow("Settings"); }} variant="text" sx={{ fontFamily:'Montserrat Alternates', color:'#f3f4ed', height:'50px', borderRadius:'0px', padding:'0px 45px', borderBottom:'2px solid #c06115' }} elevation={0}>Settings</Button>
            </Box>
        )
    }


    const _RenderToUploadImagePreview = () => {
        if(_uploadedPhoto !== null){
            return <img alt="User Cover" src={ URL.createObjectURL(_uploadedPhoto) } height='100px'/>
        }else{
            return <img alt="User Cover" src={ '/static/images/avatar.png' } height='100px'/>
        }
    }

    const _RenderProfileImage = () => {
        if(UserAccountImage){
            return <img alt="User Cover" src={ '/static'+ UserAccountImage } height='150px'/>
        }else{
            return <img alt="User Cover" src={ '/static/images/default_avatar.png' } height='150px'/>
        }
    }

    return (
        <Box component='div' sx={{ width:'100vw' }}>
            <TopNavComponent />

            <Grid 
                container 
                justifyContent='center'
                sx={{ paddingTop:'200px', paddingBottom:'3%', backgroundColor:'#f3f4ed' }}
            >
                <Grid item xs={10}>
                    <Card 
                        sx={{ backgroundColor:'#546263', overflow:'visible' }}
                    >
                        <Grid container justifyContent='center' sx={{ height:'120px', position:'relative', top:'-76px' }}>
                             <Grid item xs={12} sx={{ display:'flex', justifyContent:'center' }}>
                                <Box sx={{  width:'150px', height:'150px', overflow:'hidden', borderRadius:'50%', border:'2px solid #c06115'}}>
                                    {_RenderProfileImage()}
                                </Box>
                             </Grid>
                        </Grid>                        
                        <CardActions sx={{ padding:'0px' }}>
                            <Grid container justifyContent='center'>
                                <Grid item xs={12} sx={{ display:'flex', justifyContent:'center' }}>
                                    
                                    { _PanelToShow === "Bookmark" ? _BookmarkMenuActive() : _SettingsMenuActive() }
                                    
                                </Grid>
                            </Grid> 
                        </CardActions>
                        <CardContent sx={{ padding:'0px', minHeight:'480px' }}>
                            { _PanelToShow === "Bookmark" ? _BookmarkPanel() : _SettingsPanel() }
                        </CardContent>
                        
                    </Card>
                </Grid>

            </Grid>

            <FooterComponent />
        </Box>
    )
}

