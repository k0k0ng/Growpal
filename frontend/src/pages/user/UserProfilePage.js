import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';
import AuthContext from '../../context/AuthContext';

import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from'@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';


import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { CardActionArea } from '@mui/material';


import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});


export default function UserProfilePage(){
    const navigate = useNavigate();
    const [refresher, setRefresher] = useState(() => { return true; });
    const {user, UserAccountName, UserAccountImage, userBookmark ,setUserBookmark, resetUser, setResetUser} = useContext(AuthContext);
    let BookmarkedTools = [];

    const [PanelToShow, setPanelToShow] = useState(() => { 
        if(localStorage.getItem('BookmarkPanel')){
            return localStorage.getItem('BookmarkPanel');
        }

        return "Settings";
    })

    useEffect(()=> {
        localStorage.removeItem('BookmarkPanel');
    }, [PanelToShow])

    let [pageNumber, setPageNumber] = useState(() => { return 0; });
    let [toolsPerPage, setToolsPerPage] = useState(() => { return 10; });
    const pagesVisited = pageNumber * toolsPerPage;
    const pageCount = Math.ceil(userBookmark.length / toolsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    
    useEffect(()=> {
        if(!userBookmark) return;
        BookmarkedTools = [];
        userBookmark.map((item) => {
            BookmarkedTools.push(item)
        })
    }, [userBookmark])


    const GetUserBookmarkedTools = async () => {
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


    const _HandleAddBookmarkButtonPressed = (toolID) => {
        if(!user){
            alert("Please login.")
            return
        }

        fetch('/api/add-to-bookmark',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                tool_ID: toolID,
                user_Email: user.email,
            })
        }).then((response) => {

            if(response.status === 404) return;
            
            GetUserBookmarkedTools()
            
            setRefresher(!refresher)            
        });
    }

    const BookmarkPanel = (props) => {
        return (
            <Grid 
                container 
                spacing={4}
                minHeight='200px'
                sx={{ margin:'0', padding:'0px 5% 4% 5%'}}
            >
                {userBookmark.slice(pagesVisited, pagesVisited + toolsPerPage).map((tool) => {
                    
                    return <Grid item 
                                key={tool.id} 
                                xl={2.3}
                                lg={2.9}
                                md={4}
                                sm={5}
                                xs={9}
                            >
                                <Card sx={{ maxWidth: 345, backgroundColor:'#546263', color:'#f3f4ed', border:'1px solid #f3f4ed', borderRadius:3 }} elevation={0}>
                                    
                                    <CardHeader
                                        avatar={
                                            <IconButton aria-label="settings" sx={{ marginLeft:'12px', marginTop:'-3px' , padding:'0px', borderRadius:'0px'}}>
                                                <BookmarkIcon sx={{fontSize:'35px', padding:'0px', color:'#c06115'}}  />          
                                            </IconButton>
                                        }
                                        sx={{
                                            position:'absolute',
                                            padding:'0px',
                                            zIndex:'1999'
                                        }}
                                        onClick={() => _HandleAddBookmarkButtonPressed (tool.id, tool.title)}
                                    />
                    
                                    <CardActionArea sx={{ minHeight:350, padding:'40px 20px 0px 20px' }} onClick={() => {console.log(tool.title); navigate("/view-tool/"+tool.id)}} className='card-action-area'>
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

                <Grid item xs={12} maxHeight="100px" sx={{ alignSelf: 'end'}}>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination-buttons"}
                        nextLinkClassName={"pagination-next-button"}
                        previousLinkClassName={"pagination-previous-button"}
                        disabledClassName={"pagination-disabled"}
                        activeClassName={"pagination-active"}
                    />
                </Grid>
            </Grid>
        )
    }

    const [hasChanges, setHasChanges] = useState(() => {return false;});
    const [NameField, setNameField] = useState(() => {return "";});
    const [uploadedPhoto, setUploadedPhoto] = useState(() => {return null;});
    const [openEditName, setOpenEditName] = useState(() => {return false;});
    const [openUploadPhoto, setOpenUploadPhoto] = useState(() => {return false;});

    useEffect(() => {
        setNameField(UserAccountName)
    }, [UserAccountName])

    // useEffect(() => {
    //     setUploadedPhoto(UserAccountImage)
    //     console.log(uploadedPhoto)
    // }, [UserAccountImage])
    
    const ShowEditName = () => {
        setOpenEditName(!openEditName);
    };
    const ShowUploadPhoto = () => {
        setOpenUploadPhoto(!openUploadPhoto);
    };

    const ChangeNameField = (e) => {
        setHasChanges(true);
        setNameField(e.target.value);
    }

    const ChangeUploadPhoto = (e) => {
        setHasChanges(true);
        setUploadedPhoto(prevValue => prevValue = e.target.files[0]);
    }

    const CancelChangeConfirmed = () => {
        setNameField("");
        setHasChanges(false);
        setUploadedPhoto(null);
        setShowCancelConfirmation(false);
    }


    const [ShowCancelConfirmation, setShowCancelConfirmation] = useState(false);

    const SaveButtonClicked = () => {
        let formField = new FormData()
        formField.append('email', user.email)
        formField.append('name', NameField !== "" ? NameField : user.name)
        formField.append('display_image', uploadedPhoto !== null ? uploadedPhoto : user.display_image)

        axios({
            method: 'PATCH',
            url:'/api/update-account-name-image',
            data: formField,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
        }).then(response=>{
            console.log("========== Activate Reset User ================")
            setResetUser(!resetUser);
        });

        setHasChanges(false);
    }

    const ShowCancelConfirmationOpen = () => {
        setShowCancelConfirmation(true);
    };

    const ShowCancelConfirmationClose = () => {
        setShowCancelConfirmation(false);
    };
    
    const DisplaySaveCancelButton = () => {
        if(hasChanges){
            return (
                <Grid item xs={12} sx={{ display:'flex', justifyContent:'center', marginTop:'2%' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className='contact-us-right-container-send-button'
                        sx={{ margin:'0px 1%' }}
                        onClick={SaveButtonClicked}
                    >
                        Save
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className='contact-us-right-container-send-button' 
                        sx={{ margin:'0px 1%' }}
                        onClick={ShowCancelConfirmationOpen}
                    >
                        Cancel
                    </Button>
                    <Box component='div'>
                        <Dialog
                            open={ShowCancelConfirmation}
                            onClose={ShowCancelConfirmationClose}
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
                                <Button onClick={ShowCancelConfirmationClose}>Disagree</Button>
                                <Button 
                                    className='contact-us-right-container-send-button' 
                                    onClick={CancelChangeConfirmed} 
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

    

    const SettingsPanel = (props) => {
        return (
            <Grid 
                container 
                justifyContent='center'
                sx={{ marginTop:'2%' }}
            >
                <Grid item xs={4} sx={{ display:'flex', justifyContent:'center' }}>
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

                        <ListItemButton onClick={ShowEditName}>
                            <ListItemIcon>
                                <AssignmentIndRoundedIcon sx={{ color:'#c06115' }} />
                            </ListItemIcon>
                            <ListItemText primary={UserAccountName} primaryTypographyProps={{ fontFamily:'Montserrat Alternates' }} />
                            {openEditName ? <ExpandLess sx={{ color:'#546263' }} /> : <ExpandMore sx={{ color:'#546263' }} />}
                        </ListItemButton>
                        <Collapse in={openEditName} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4, pr: 4 }}>
                                <FormControl component="fieldset" sx={{ width:'100%' }}>
                                    <TextField 
                                        id="name" 
                                        label="Name" 
                                        name='name' 
                                        value={NameField} 
                                        variant="outlined" 
                                        InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                                        InputLabelProps={{ style: { fontFamily:'Montserrat Alternates' }} }
                                        required 
                                        onChange={ChangeNameField} 
                                    />
                                </FormControl>
                            </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={ShowUploadPhoto}>
                            <ListItemIcon>
                                <ImageRoundedIcon sx={{ color:'#c06115' }} />
                            </ListItemIcon>
                            <ListItemText primary="Change Profile" primaryTypographyProps={{ fontFamily:'Montserrat Alternates' }} />
                            {openUploadPhoto ? <ExpandLess sx={{ color:'#546263' }} /> : <ExpandMore sx={{ color:'#546263' }} />}
                        </ListItemButton>
                        <Collapse in={openUploadPhoto} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Grid item xs={12} align="center">
                                    <Typography 
                                        variant="body2" 
                                        sx={{ fontFamily:'Montserrat Alternates' }}
                                    >
                                        { uploadedPhoto ? uploadedPhoto.name : "Image name"}
                                    </Typography>
                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={ChangeUploadPhoto} />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Grid>
                            </ListItemButton>
                            </List>
                        </Collapse>
                        
                    </List>

                </Grid>
                
                {DisplaySaveCancelButton()}
                
            </Grid>
        )
    }

    const BookmarkMenuActive = () => {
        return (
            <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                <Button onClick={() => { setPanelToShow("Bookmark"); }} variant="text" sx={{ fontFamily:'Montserrat Alternates', color:'#f3f4ed', height:'50px', borderRadius:'0px', padding:'0px 45px', borderBottom:'2px solid #c06115' }} elevation={0}>Bookmarks</Button>
                <Divider orientation="vertical" sx={{ height:'30px', background:'#f3f4ed' }} />
                <Button onClick={() => { setPanelToShow("Settings"); }} variant="text" sx={{ fontFamily:'Montserrat Alternates', color:'#f3f4ed', height:'50px', borderRadius:'0px', padding:'0px 45px' }}>Settings</Button>
            </Box>
        )
    }

    const SettingsMenuActive = () => {
        return (
            <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                <Button onClick={() => { setPanelToShow("Bookmark"); }} variant="text" sx={{ fontFamily:'Montserrat Alternates', color:'#f3f4ed', height:'50px', borderRadius:'0px', padding:'0px 45px' }} >Bookmarks</Button>
                <Divider orientation="vertical" sx={{ height:'30px', background:'#f3f4ed' }} />
                <Button onClick={() => { setPanelToShow("Settings"); }} variant="text" sx={{ fontFamily:'Montserrat Alternates', color:'#f3f4ed', height:'50px', borderRadius:'0px', padding:'0px 45px', borderBottom:'2px solid #c06115' }} elevation={0}>Settings</Button>
            </Box>
        )
    }


    const RenderProfileImage = () => {
        if(UserAccountImage){
            return <img alt="User Cover" src={ '/static'+ UserAccountImage } height='150px'/>
        }else{
            return <img alt="User Cover" src={ '/static/images/default_avatar.png' } height='150px'/>
        }
    }
    return (
        <Box component='div'>
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
                                <Box sx={{  width:'150px', height:'150px', overflow:'hidden', borderRadius:'75px', border:'2px solid #c06115'}}>
                                    {RenderProfileImage()}
                                </Box>
                             </Grid>
                        </Grid>                        
                        <CardActions sx={{ padding:'0px' }}>
                            <Grid container justifyContent='center'>
                                <Grid item xs={12} sx={{ display:'flex', justifyContent:'center' }}>
                                    
                                    { PanelToShow === "Bookmark" ? BookmarkMenuActive() : SettingsMenuActive() }
                                    
                                </Grid>
                            </Grid> 
                        </CardActions>
                        <CardContent sx={{ padding:'0px', minHeight:'480px' }}>
                            { PanelToShow === "Bookmark" ? BookmarkPanel() : SettingsPanel() }
                        </CardContent>
                        
                    </Card>
                </Grid>

            </Grid>

            <FooterComponent />
        </Box>
    )
}

