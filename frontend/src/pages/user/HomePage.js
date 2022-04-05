import React, { useState, useEffect, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { Parallax } from 'react-parallax'
import { Link, useNavigate } from "react-router-dom";

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';
import AuthContext from '../../context/AuthContext';
import ContactUsComponent from '../../components/ContactUsComponent';

import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
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
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';

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

export default function HomePage() {
    const navigate = useNavigate(); 

    const {user, userBookmark ,setUserBookmark} = useContext(AuthContext);
    const [refresher, setRefresher] = useState(() => { return true; });
    const [activeCategory, setActiveCategory] = useState(() => { return "All Tools"; });

    let [allTools, setAllTools] = useState(() => { return []; });
    let [pageNumber, setPageNumber] = useState(() => { return 0; });
    let [toolsPerPage, setToolsPerPage] = useState(() => { return 10; });
    const pagesVisited = pageNumber * toolsPerPage;
    const pageCount = Math.ceil(allTools.length / toolsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    let [searchedKey, setSearchedKey] = useState(() => { return ""; });
    let BookmarkedTools = [];

    if(userBookmark){
        userBookmark.forEach((tool) =>{
            BookmarkedTools.push(tool.title)
        })
    }

    useEffect(()=> {
        if(!userBookmark) return;
        BookmarkedTools = [];
        userBookmark.map((item) => {
            BookmarkedTools.push(item.title)
        })
    }, [userBookmark])
    
    useEffect(() => {
        getTools();    
        
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
    
    
    const _SearchedKeyChange = (event) => {
        setSearchedKey(event.target.value);         
    }

    useEffect(() => {
        if(searchedKey === '') getTools();
        
        GetSearchedTool();
    },[searchedKey]);
    

    const GetSearchedTool = async () => {
        const response = await fetch('/api/get-searched-tool', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                keyword: searchedKey
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

    const [filter, setFilter] = useState();
    const [order, setOrder] = useState();
    
    const handleFilterChange = (event) => {
        setFilter( prevValue => prevValue = event.target.value);
    };

    const handleOrderChange = (event) => {
        setActiveCategory( prevValue => prevValue = event.target.value);
    };


    const handleActiveSidebarMenu = (event) => {
        setActiveCategory( prevValue => prevValue = event.currentTarget.value);
    };


    const getTools = async () => {
        const response = await fetch('/api/get-all-tools').catch(err => {
            console.log("-------------------")
            console.log(err);
        });

        if(response.status === 204){
            setAllTools([]);
            return 
        }

        const data = await response.json();
        setAllTools(data.slice(0,40));
    }

    const GetToolsByCategory = async () => {
        const response = await fetch('/api/get-tool-by-category', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                category: activeCategory
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

    useEffect(() => {

        if(activeCategory === "All Tools"){
            getTools();
        }else{
            GetToolsByCategory();
        }

    },[activeCategory]);


    const ActiveSidebarMenuButton = (category) => {
        return (
            <Container key={category} className='sidebar-button-container'>
                <Button variant="contained" className='sidebar-button-active'>{category}</Button>
            </Container>
        );
    };
    
    const SidebarMenuButton = (category) => {
        return (
            <Container key={category} className='sidebar-button-container'>
                <Button 
                    disableElevation 
                    onClick={handleActiveSidebarMenu} 
                    value={category.toString()} 
                    variant='contained' 
                    className='sidebar-buttons'
                >
                    {category}
                </Button> 
            </Container>
        );
    };


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

            GetUserBookmarkedTools()       
            
            setRefresher(!refresher)            
        });
    }

    
    


    const BookmarkIconToShow = (props) => {
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

    const DisplayTools = allTools
    .slice(pagesVisited, pagesVisited + toolsPerPage)
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
                        <Tooltip title={ user && BookmarkedTools.includes(tool.title) ? "Remove bookmark" : "Bookmark Tool"} placement="right-start">
                            <IconButton aria-label="settings" className={'tool-content-card-bookmark-button'}>
                                <BookmarkIconToShow isBookmarked={ BookmarkedTools.includes(tool.title) ? true : false } sx={{ height:'100px' }} />         
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
                                <select onChange={handleOrderChange}>
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
                                category === activeCategory ? ActiveSidebarMenuButton(category) : SidebarMenuButton(category) 
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
                            {DisplayTools}

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
                    </Grid>
                </Grid>
            </Box>

            <ContactUsComponent />

            <FooterComponent />
        </Box>
    ); 
}