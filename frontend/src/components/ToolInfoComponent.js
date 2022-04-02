import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import TopNavComponent from './TopNavComponent';
import FooterComponent from './FooterComponent';
import AuthContext from '../context/AuthContext';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';

import Chip from '@mui/material/Chip';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Tooltip from '@mui/material/Tooltip';

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { CardActionArea } from '@mui/material';


export default function ToolInfoComponent(){

    const navigate = useNavigate();
    const {user, setUserBookmark} = useContext(AuthContext);
    const { toolID } = useParams();

    const [isLoading, setIsLoading] = useState(() => { return true; });
    const [refresher, setRefresher] = useState(() => { return true; });
    const [editMode, setEditMode] = useState(() => { return false; });

    useEffect(() => {
        _GetToolDetails();
    },[editMode]);

    const [toolInfo, setToolInfo] = useState(() => { return null; });
    const [toolTitleField, setToolTitleField] = useState(() => { return ""; });
    const [toolDescriptionField, setToolDescriptionField] = useState(() => { return ""; });
    const [toolImageField, setToolImageField] = useState(() => { return null; });
    const [toolURLField, setToolURLField] = useState(() => { return ""; });
   

    useEffect(() => {
        window[`scrollTo`]({ top:'0', behavior: `smooth` });
        setEditMode(prevValue => prevValue = false)
        _GetToolDetails();
        _GetAlternativeTools();
    },[toolID]);

    useEffect(() =>{
        console.log(toolInfo);
    },[toolInfo])
    

    const _GetToolDetails = () => {
        fetch('/api/get-tool-info'+'?toolID='+toolID)
        .then((response) => response.json())
        .then((data) => {
            setToolInfo(prevValue => prevValue = data);
            setIsLoading(false);
        });
    }



    const _SetTitle = (e) => {
        setToolTitleField(prevValue => prevValue = e.target.value);
    }

    const _SetDescription = (e) => {
        setToolDescriptionField(prevValue => prevValue = e.target.value)
    }

    const _SetImage = (e) => {
        setToolImageField(prevValue => prevValue = e.target.value)
    }

    const _SetURL = (e) => {
        setToolURLField(prevValue => prevValue = data.url)
    }


    const _ToEditMode = () => {
        setEditMode( prevValue => prevValue = true);
    }

    const _ToViewMode = () => {
        setEditMode( prevValue => prevValue = false);
    }

    const _SaveEditTool = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: toolID,
                title: toolTitleField,
                description: toolDescriptionField,
                image: toolImageField,
                url: toolURLField
            }),
        };
        fetch('/api/update-tool-info', requestOptions)
        .then((response) => {
            if (response.ok){
                console.log("Sucess update.");
            }else{
                console.log("Failed update.");
            }
        });
    }

    const _ViewMode = () => {
        if(isLoading) return null;

        return (
            <Grid 
                container 
                sx={{ width:'100%', justifyContent:'center' }}
            >
                <Grid item xs={10} sx={{ display:'flex', justifyContent:'center', alignItems:'baseline' }}>
                    <Typography variant='h2' align='center' sx={{ padding:'0px 10px', fontFamily:'Montserrat Alternates', color:'#f3f4ed' }}>{toolInfo.title}</Typography>
                     
                </Grid>
                <Grid item xs={10} align='center' className='tool-info-description'>
                    <pre>{toolInfo.description}</pre>
                </Grid>
                <Grid item xs={10} align='center' sx={{ margin:'2% 0px' }}>
                    <Tooltip title="Visit Website" placement="top-start">
                        <Button color="primary" variant='contained' aria-label="Tool website link" href={toolInfo.url} target="_blank">
                            Visite Website
                            <OpenInNewRoundedIcon sx={{ color:'#f3f4ed' }} />
                        </Button>
                    </Tooltip>
                </Grid>
                {/* <Grid item xs={12} align='center'><Button color='secondary' size='small' variant='contained' onClick={_ToEditMode}>Edit Tool</Button></Grid> */}
            </Grid>
        );
    }

    const _EditMode = () => {
        return (
        <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant='h4' align='center'>Edit Tool Info</Typography></Grid>
            <Grid item xs={12} align='center'><TextField label="Title" defaultValue={toolInfo.title} variant="outlined" onChange={_SetTitle}/></Grid>
            <Grid item xs={12} align='center'><TextField label="Description" defaultValue={toolInfo.description} variant="outlined" onChange={_SetDescription} /></Grid>
            <Grid item xs={12} align='center'><TextField label="Image" defaultValue={toolInfo.image} variant="outlined" onChange={_SetImage} /></Grid>
            <Grid item xs={12} align='center'><TextField label="Link" defaultValue={toolInfo.url} variant="outlined" onChange={_SetURL} /></Grid>
            <Grid item xs={12} align='center'><Button color='primary' variant='contained' onClick={_SaveEditTool}>Save</Button></Grid>
            <Grid item xs={12} align='center'><Button color='secondary' size='small' variant='contained' onClick={_ToViewMode}>Cancel</Button></Grid>
        </Grid>
        );
    }

    
    const RenderToolImage = () => {
        if(toolInfo){
            return <img alt="User Cover" src={ '/static'+ toolInfo.image } height='110px'/>
        }else{
            return <img alt="User Cover" src={ '/static/images/default-logo.png' } height='150px'/>
        }
    }

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

    const _HandleAddBookmarkButtonPressed = (toolID) => {
        if(!user){
            alert("Please login.")
            return
        }

        fetch('/api/add-remove-tool-to-bookmark',{
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
            
            _GetUserBookmarkedTools()
            
            setRefresher(!refresher)            
        });
    }


    const [alternativeTools, setAlternativeTools] = useState(() => { return []});

    const _GetAlternativeTools = async () => {
        let response = await fetch('/api/get-tool-alternative-tools',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                toolID: toolID
            })
        })
        if(response.status === 204) {
            return;
        }
        
        let data = await response.json();
        
        if(response.status === 200){
            setAlternativeTools(data);
        }else{
            alert('Something went wrong getting alternative tools!');
        }
    }

    useEffect(() => {
        console.log(alternativeTools);
        console.log("=====================================================================")
    }, [alternativeTools])
    
    

    let [pageNumber, setPageNumber] = useState(() => { return 0; });
    let [toolsPerPage, setToolsPerPage] = useState(() => { return 5; });
    const pagesVisited = pageNumber * toolsPerPage;
    const pageCount = Math.ceil(alternativeTools.length / toolsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const DisplayPagination = () => {
        if(alternativeTools.length > 0){
            return (
                <Grid item xs={12} maxHeight="100px" sx={{ alignSelf: 'end' }}>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
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


    const DisplayAlternativeTools = () => {
        return (
            <Grid 
                container 
                spacing={4}
                minHeight='400px'
                justifyContent={'center'}
                width={'100%'}
                sx={{ margin:'0', padding:'0px 5% 4% 5%' }}
            >
                <Grid item xs={11} sx={{ maxHeight:'60px', display:'flex', justifyContent:'center', alignItems:'center', margin:'2% 0px' }}>
                    <Typography variant='h4' sx={{ fontFamily:'Montserrat Alternates', textAlign:'center', color:'#f3f4ed' }}>
                        Alternative Tools
                    </Typography>
                </Grid>
                {alternativeTools.slice(pagesVisited, pagesVisited + toolsPerPage).map((tool) => {

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

                { DisplayPagination() }
                
            </Grid>
        )
    }

    return (
        <Box component='div' sx={{ width:'100vw' }}>
            <TopNavComponent />

            <Grid 
                container 
                justifyContent='center'
                sx={{ paddingTop:'200px', paddingBottom:'3%', backgroundColor:'#f3f4ed' }}
            >
                <Grid item xs={10} md={8}>
                    <Card 
                        sx={{ backgroundColor:'#546263', overflow:'visible' }}
                    >
                        <Grid container justifyContent='center' sx={{ height:'120px', position:'relative', top:'-76px' }}>
                            <Grid item xs={12} sx={{ display:'flex', justifyContent:'center' }}>
                                <Box sx={{  width:'150px', height:'150px', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'50%', border:'2px solid #c06115', bgcolor:'#f3f4ed'}}>
                                    {RenderToolImage()}
                                </Box>
                            </Grid>
                        </Grid>         
                        <CardContent sx={{ padding:'0px' }}>
                            { editMode ? _EditMode() : _ViewMode() }
                        </CardContent>
                        
                    </Card>
                </Grid>

            </Grid>

            <Box component="div" className='alternative-tools-div' >
                <Grid sx={{ flexGrow: 1 }} container spacing={3}>
                    <Grid 
                        item
                        xs={12}
                        style={{ 
                            padding: '0px'
                        }} 
                    >
                        {DisplayAlternativeTools()}
                    </Grid>
                </Grid>
            </Box>

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
                        <Box
                            sx={{ width: '100%' }}
                        >
                            
                            <TextField 
                                id="outlined-basic" 
                                label="Name" 
                                variant="outlined" 
                                InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                                InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                                className='contact-us-input-field'
                            />
                            <TextField 
                                id="outlined-basic" 
                                label="Email" 
                                variant="outlined" 
                                InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                                InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                                className='contact-us-input-field'
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows={4}
                                InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                                InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                                className='contact-us-input-field'
                            />
                            <Box>
                                <Button className='contact-us-right-container-send-button' to="/" component={Link}>
                                    Send
                                </Button>
                            </Box>
                        </Box>
                        
                    </Grid>
                    
                </Grid>
            </Box>

            <FooterComponent />
        </Box>
    )
}

