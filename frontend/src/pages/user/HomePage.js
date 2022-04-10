import React, { useState, useEffect, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { Parallax } from 'react-parallax'
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from 'notistack';

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';
import AuthContext from '../../context/AuthContext';
import ContactUsComponent from '../../components/ContactUsComponent';

import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { CardActionArea } from '@mui/material';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';

const categories = [
    'All Tools',
    'Marketing',
    'E-commerce',
    'HR',
    'Legal',
    'Project Management',
    'Sale & CRM',
    'Cloud Service',
    'Client Management',
    'Banking',
    'Desgin',
    'No-Code',
    'Web Development',
    'Accounting'
  ];

const herobg = "/static/images/HeroBG.png";

const ToolsSection = () => {
    const navigate = useNavigate(); 
    const {user, userBookmark ,setUserBookmark} = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const [order, setOrder] = useState("");
    const [_activeCategory, setActiveCategory] = useState(() => { return "All Tools"; });
    let [_allTools, setAllTools] = useState(() => { return []; });
    let [_pageNumber, setPageNumber] = useState(() => { return 0; });
    let [_toolsPerPage, setToolsPerPage] = useState(() => { return 10; });
    const _pagesVisited = _pageNumber * _toolsPerPage;
    const _pageCount = Math.ceil(_allTools.length / _toolsPerPage);

    let _BookmarkedTools = [];
    let [_searchedKey, setSearchedKey] = useState(() => { return ""; });

    useEffect(() => {
        _GetAllTools();    
        
        if( window.innerWidth <  600 ) {
            setToolsPerPage(6);
        }else if(window.innerWidth <  900){
            setToolsPerPage(8);
        }else if(window.innerWidth <  1200){
            setToolsPerPage(9);
        }else if(window.innerWidth <  1536){
            setToolsPerPage(8);
        }
    },[]);

    useEffect(() => {
        if(_activeCategory === "All Tools"){
            _GetAllTools();
        }else{
            _GetAllToolsByCategory();
        }
    },[_activeCategory]);

    useEffect(() => {
        if(_searchedKey === '') _GetAllTools();
        
        _GetSearchedTool();
    },[_searchedKey]);

    useEffect(()=> {
        if(!userBookmark) return;
        _BookmarkedTools = [];
        userBookmark.map((item) => {
            _BookmarkedTools.push(item.title)
        })
    }, [userBookmark])

    if(userBookmark){
        userBookmark.forEach((tool) =>{
            _BookmarkedTools.push(tool.title)
        })
    }

    const _GetAllTools = async () => {
        const response = await fetch('/api/get-all-tools').catch(err => {
            console.log("--------- Error ----------")
            console.log(err);
        });

        if(response.status === 204){
            setAllTools([]);
            return 
        }

        const data = await response.json();
        setAllTools(data.slice(0,40));
    }

    const _GetAllToolsByCategory = async () => {
        const response = await fetch('/api/get-tool-by-category', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                category: _activeCategory
            })
        }).catch(err => {
            console.log(err);
        });

        if(response.status === 204){
            setAllTools([]);
            return 
        }

        const data = await response.json();
        setAllTools(data.slice(0,40));
    }

    const BookmarkActionLoggedInUser = (variant) => {
        if(variant === "success"){
            enqueueSnackbar('Tool added to bookmark.', { variant });
        }else{
            enqueueSnackbar('Tool removed from bookmark.', { variant });
        }
        
    };

    const BookmarkActionNotLoggedInUser = (variant) => {
        enqueueSnackbar('Please loggin to bookmark a tool.', { variant });
    };

    const _HandleAddBookmarkButtonPressed = (toolID) => {
        if(!user){
            BookmarkActionNotLoggedInUser('warning')
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

            if(response.status === 201) BookmarkActionLoggedInUser('success');
            if(response.status === 200) BookmarkActionLoggedInUser('info');

            _GetUserBookmarkedTools()                
        });
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

    const _HandleActiveSidebarMenu = (event) => {
        setActiveCategory( prevValue => prevValue = event.currentTarget.value);
    };

    const _HandleOrderChange = (event) => {
        setOrder( prevValue => prevValue = event.target.value);
    };

    const _SearchedKeyChange = (event) => {
        setSearchedKey(event.target.value);         
    }

    const _GetSearchedTool = async () => {
        const response = await fetch('/api/get-searched-tool', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                keyword: _searchedKey
            })
        }).catch(err => {
            console.log(err);
        });

        if(response.status === 204){
            setAllTools([]);
            return 
        }

        const data = await response.json();
        setAllTools(data.slice(0,40));
    }

    const _ChangePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const _ActiveSidebarMenuButton = (category) => {
        return (
            <Container key={category} className='sidebar-button-container'>
                <Button variant="contained" className='sidebar-button-active'>{category}</Button>
            </Container>
        );
    };
    
    const _SidebarMenuButton = (category) => {
        return (
            <Container key={category} className='sidebar-button-container'>
                <Button 
                    disableElevation 
                    onClick={_HandleActiveSidebarMenu} 
                    value={category.toString()} 
                    variant='contained' 
                    className='sidebar-buttons'
                >
                    {category}
                </Button> 
            </Container>
        );
    };

    const _BookmarkIconToShow = (props) => {
        if (props.isBookmarked) {
            return (
                <BookmarkIcon sx={{fontSize:'35px', padding:'0px', color:'#c06115'}}  />          
            )
        }else{
            return (
                <BookmarkBorderOutlinedIcon sx={{fontSize:'35px', padding:'0px', color:'#434743'}}  />
            )
        }
    }
    
    const _DisplayAllTools = _allTools
    .slice(_pagesVisited, _pagesVisited + _toolsPerPage)
    .map((tool) => {
        return (
            <Grid item 
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
                            <Tooltip title={ user && _BookmarkedTools.includes(tool.title) ? "Remove bookmark" : "Add bookmark"} placement="right-start">
                                <IconButton aria-label="settings" className={'tool-content-card-bookmark-button'}>
                                    <_BookmarkIconToShow isBookmarked={ _BookmarkedTools.includes(tool.title) ? true : false } sx={{ height:'100px' }} />         
                                </IconButton>
                            </Tooltip>
                        }
                        className={'tool-content-card-header'}
                        onClick={() => _HandleAddBookmarkButtonPressed (tool.id, tool.title)}
                    />
                    <CardActionArea className={'tool-content-card-action-area'} onClick={() => {console.log(tool.title); navigate("/view-tool/"+tool.id)}} >
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
        );
    });

    return (
        <Box>
            <Box component="div" id='tool_search_div' className='tools-search-div'>
                <Grid 
                    container 
                    spacing={4}
                    justifyContent='center'
                >
                    <Grid item xs={10} sm={6} md={7} >
                        <Paper
                            component="form"
                            className='tools-search-field-container'
                        >
                            <IconButton 
                                sx={{ p: '10px' }} 
                                aria-label="search"
                                onClick={ () => {} } 
                            >
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Tool"
                                inputProps={{ style: { fontFamily:'Montserrat Alternates' },'aria-label': 'search tool' }}
                                onChange={_SearchedKeyChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs='auto' sx={{ display:{md:'none'} }}>
                        <div id="custom-select-parent">
                            <div id="custom-select">
                                <select onChange={_HandleOrderChange}>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}  
                                </select>
                            </div>
                        </div>
                    </Grid>                     
                </Grid>
            </Box>
            <Box component="div" className='tools-contents-div'>
                <Grid sx={{ flexGrow: 1 }} container spacing={3}>
                    <Grid 
                        item 
                        lg={2.5}
                        md={3}
                        style={{
                            padding: '0px 0px 50px 50px'
                        }} 
                        sx={{
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <Box component='div' className='sidebar-box-container' >                                   
                            {categories.map((category) => (
                                category === _activeCategory ? _ActiveSidebarMenuButton(category) : _SidebarMenuButton(category) 
                            ))}   
                        </Box>
                    </Grid>
                    <Grid 
                        item 
                        lg={9.5} 
                        md={8.7}
                        xs={12}
                        style={{ 
                            padding: '0 0 0 30px'
                        }} 
                    >
                        <Grid container spacing={4} className='tools-container'>
                            {_DisplayAllTools}

                            <Grid item xs={12} maxHeight="100px" sx={{ alignSelf: 'end'}}>
                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={_pageCount}
                                    onPageChange={_ChangePage}
                                    containerClassName={"pagination-buttons"}
                                    nextLinkClassName={"pagination-next-button"}
                                    previousLinkClassName={"pagination-previous-button"}
                                    disabledClassName={"pagination-disabled"}
                                    activeClassName={"pagination-active"}
                                />
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default function HomePage() {
    return (
        <Box component='div'>
            <TopNavComponent /> 

            <Parallax bgImage={herobg} strength={200}>
                <Box component="div" className='hero-main-div'>
                    <Box component="div" className='hero-main-div-upper' >
                        <Box component="div" className='hero-left-div'>
                            <img
                                className='hero-image'
                                src="/static/images/hero-image.png"
                                alt="Helping each other vector"
                                loading="lazy"
                            />
                        </Box>
                        { <Box component='div' className='hero-right-div'>
                            <Box component='div' className='hero-right-div-header'>
                                <Box component='div'>
                                    <Typography display="inline" className='hero-primary-colored-heading'>Work </Typography>
                                    <Typography display="inline" className='hero-secondary-colored-heading'>efficiently</Typography>
                                </Box>
                                <Box>
                                    <Typography display="inline" className='hero-primary-colored-heading'>Grow </Typography>
                                    <Typography display="inline" className='hero-secondary-colored-heading'>continously</Typography>
                                </Box>
                                <Box>
                                    <Typography className='hero-secondary-colored-subHeader'>Growpal helps you find the best tools to keep you and your business stay ahead in the compitition. </Typography>

                                </Box>
                            </Box>
                        </Box> }
                    </Box>
                    
                    <Box component='div' className='hero-arrow-down'>
                        <IconButton aria-label="menu" onClick={() => { window[`scrollTo`]({ top:window.innerHeight, behavior: `smooth` }) }} >
                            <KeyboardDoubleArrowDownIcon className='hero-arrow-down-icon' />
                        </IconButton>
                    </Box>
                </Box>
            </Parallax>

            <SnackbarProvider maxSnack={3}>
                <ToolsSection />
            </SnackbarProvider>

            <ContactUsComponent />

            <FooterComponent />
        </Box>
    ); 
}