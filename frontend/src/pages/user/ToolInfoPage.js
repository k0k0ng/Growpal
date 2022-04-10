import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import ReactPaginate from 'react-paginate';

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';
import AuthContext from '../../context/AuthContext';
import ContactUsComponent from '../../components/ContactUsComponent';

import { CardActionArea } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import BookmarkIcon from '@mui/icons-material/Bookmark';


const AlternativeToolsSection = () => {
    const navigate = useNavigate();
    const { toolID } = useParams();
    const {user, setUserBookmark, userBookmark } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [_alternativeTools, setAlternativeTools] = useState(() => { return []});

    let BookmarkedTools = [];
    let [_pageNumber, setPageNumber] = useState(() => { return 0; });
    let [_toolsPerPage, setToolsPerPage] = useState(() => { return 4; });
    const _pagesVisited = _pageNumber * _toolsPerPage;
    const _pageCount = Math.ceil(_alternativeTools.length / _toolsPerPage);

    if(userBookmark){
        userBookmark.forEach((tool) =>{
            BookmarkedTools.push(tool.title)
        })
    }

    useEffect(() => {        
        if( window.innerWidth <  600 ) {
            setToolsPerPage(2);
        }else if(window.innerWidth <  900){
            setToolsPerPage(2);
        }else if(window.innerWidth <  1200){
            setToolsPerPage(3);
        }else if(window.innerWidth <  1536){
            setToolsPerPage(4);
        }

        _GetAlternativeTools();
    },[toolID]);

    useEffect(()=> {
        if(!userBookmark) return;
        BookmarkedTools = [];
        userBookmark.map((item) => {
            BookmarkedTools.push(item.title)
        })
    }, [userBookmark])

    const _ChangePage = ({ selected }) => {
        setPageNumber(selected);
    };
  
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

    const BookmarkActionLoggedInUser = (variant) => {
        if(variant === "success"){
            enqueueSnackbar('Tool added to bookmark.', { variant, autoHideDuration: 3000 });
        }else{
            enqueueSnackbar('Tool removed from bookmark.', { variant, autoHideDuration: 3000 });
        }
        
    };

    const BookmarkActionNotLoggedInUser = (variant) => {
        enqueueSnackbar('Please loggin to bookmark a tool.', { variant, autoHideDuration: 3000 });
    };

    const _HandleAddBookmarkButtonPressed = (toolID) => {
        if(!user){
            BookmarkActionNotLoggedInUser('error')
            return null;
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
            
            if(response.status === 201) BookmarkActionLoggedInUser('success');
            if(response.status === 200) BookmarkActionLoggedInUser('info');

            _GetUserBookmarkedTools()     
        });
    }

    const _DisplayAlternativeTools = () => {
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
                {_alternativeTools.slice(_pagesVisited, _pagesVisited + _toolsPerPage).map((tool) => {

                    return <Grid item 
                                key={tool.id} 
                                xl={2.3}
                                lg={2.9}
                                md={4}
                                sm={5}
                                xs={9}
                            >
                                <Card className={'tool-content-card'} elevation={0}>
                                    
                                    <CardHeader
                                        avatar={
                                            <Tooltip title={ user && BookmarkedTools.includes(tool.title) ? "Remove bookmark" : "Bookmark Tool"} placement="right-start">
                                                <IconButton aria-label="settings" className={'tool-content-card-bookmark-button'}>
                                                    <_BookmarkIconToShow isBookmarked={ BookmarkedTools.includes(tool.title) ? true : false } sx={{ height:'100px' }} />         
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        className={'tool-content-card-header'}
                                        onClick={() => _HandleAddBookmarkButtonPressed (tool.id, tool.title)}
                                    />
                    
                                    <CardActionArea className={'tool-content-card-action-area'} onClick={() => {navigate("/view-tool/"+tool.id)}} >
                                        <img alt="Tool Image" src={ '/static' + tool.image } className='tool-image' />
                                        <CardContent sx={{marginBottom:'20px'}}>
                                            <Typography gutterBottom variant="h6" component="div" align='center' className='tool-title'>
                                                { tool.title }
                                            </Typography>
                                            <Typography variant="body2" className='tool-description'>
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
    
    const _BookmarkIconToShow = (props) => {
        if (props.isBookmarked) {
            return (
                <BookmarkIcon sx={{fontSize:'35px', padding:'0px', color:'#c06115'}}  />          
            );
        }else{
            return (
                <BookmarkBorderOutlinedIcon sx={{fontSize:'35px', padding:'0px', color:'#c06115'}}  />
            );
        }
    }

    const _DisplayPagination = () => {
        if(_alternativeTools.length > 0){
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
            );
        }
        return null;
    }

    return (
        <Box component="div" className='alternative-tools-div' >
            <Grid sx={{ flexGrow: 1 }} container spacing={3}>
                <Grid 
                    item
                    xs={12}
                    style={{ 
                        padding: '0px'
                    }} 
                >
                    {_DisplayAlternativeTools()}
                </Grid>
            </Grid>
        </Box>
    );
}

export default function ToolInfoComponent(){
    const { toolID } = useParams();

    const [_isLoading, setIsLoading] = useState(() => { return true; });
    const [_toolInfo, setToolInfo] = useState(() => { return null; });

    useEffect(() => {
        window[`scrollTo`]({ top:'0', behavior: `smooth` });
        _GetToolDetails();
    },[toolID]);
    
    const _GetToolDetails = () => {
        fetch('/api/get-tool-info'+'?toolID='+toolID)
        .then((response) => response.json())
        .then((data) => {
            setToolInfo(prevValue => prevValue = data);
            setIsLoading(false);
        });
    }    
    
    const _RenderToolImage = () => {
        if(_toolInfo){
            return <img alt="User Cover" src={ '/static'+ _toolInfo.image } height='110px'/>
        }else{
            return <img alt="User Cover" src={ '/static/images/default-logo.png' } height='150px'/>
        }
    }

    const _DisplayToolInfo = () => {
        if(_isLoading) return null;

        return (
            <Grid 
                container 
                sx={{ width:'100%', justifyContent:'center' }}
            >
                <Grid item xs={10} sx={{ display:'flex', justifyContent:'center', alignItems:'baseline' }}>
                    <Typography variant='h2' align='center' sx={{ padding:'0px 10px', fontFamily:'Montserrat Alternates', color:'#f3f4ed' }}>{_toolInfo.title}</Typography>
                     
                </Grid>
                <Grid item xs={10} align='center' className='tool-info-description'>
                    <pre>{_toolInfo.description}</pre>
                </Grid>
                <Grid item xs={10} align='center' sx={{ margin:'2% 0px' }}>
                    <Tooltip title="Visit Website" placement="top-start">
                        <Button 
                            variant='contained' 
                            aria-label="Tool website link" 
                            href={_toolInfo.url} 
                            target="_blank"
                            disableElevation
                            className='contact-us-right-container-send-button'
                        >
                            Visite Website
                            <OpenInNewRoundedIcon sx={{ color:'#f3f4ed' }} />
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
        );
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
                                    {_RenderToolImage()}
                                </Box>
                            </Grid>
                        </Grid>         
                        <CardContent sx={{ padding:'0px' }}>
                            { _DisplayToolInfo() }
                        </CardContent>
                        
                    </Card>
                </Grid>

            </Grid>

            <SnackbarProvider maxSnack={3} className="snackbar-custom-style">
                <AlternativeToolsSection />
            </SnackbarProvider>

            <ContactUsComponent />

            <FooterComponent />
        </Box>
    )
}

