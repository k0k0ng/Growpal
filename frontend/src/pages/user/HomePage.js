import React, { useState, useEffect, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { Parallax } from 'react-parallax'
import { Link } from "react-router-dom";

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';
import AuthContext from '../../context/AuthContext';

import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  const bg1 = "/static/images/HeroBG-1.png";
  const bg2 = "/static/images/HeroBG-2.png";
  const bg3 = "/static/images/HeroBG-3.png";
  const bg4 = "/static/images/HeroBG-4.png";


export default function HomePage() {
    const {user, userBookmark ,setUserBookmark} = useContext(AuthContext);
    const [expanded, setExpanded] = useState(() => { return false; });
    const [refresher, setRefresher] = useState(() => { return true; });
    const [activeCategory, setActiveCategory] = useState(() => { return "All Tools"; });

    let [allTools, setAllTools] = useState(() => { return []; });
    let [pageNumber, setPageNumber] = useState(() => { return 0; });
    const ToolsPerPage = 5;
    const pagesVisited = pageNumber * ToolsPerPage;
    const pageCount = Math.ceil(allTools.length / ToolsPerPage);
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
        getToolS();        
    },[]);
    
    
    const _SearchedKeyChange = (event) => {
        setSearchedKey(event.target.value);         
    }

    useEffect(() => {
        if(searchedKey === '') getToolS();
        fetch('/api/get-searched-tool', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                keyword: searchedKey
            })
        }).then((response) =>
                response.json()
        ).then((data) => {
            setAllTools(data.slice(0,10));
        }).catch(err => {
            // console.log(err);
        });
    },[searchedKey]);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    function getToolS(){
        fetch('/api/get-all-tools').then((response) => response.json()).then((data) => {
            setAllTools(data.slice(0,10))
        });
    }


    const [filter, setFilter] = useState();
    const [order, setOrder] = useState();
    
    const handleFilterChange = (event) => {
        setFilter( prevValue => prevValue = event.target.value);
    };

    const handleOrderChange = (event) => {
        setOrder( prevValue => prevValue = event.target.value);
    };


    const handleActiveSidebarMenu = (event) => {
        setActiveCategory( prevValue => prevValue = event.currentTarget.value);
    };

    const ActiveSidebarMenuButton = (category) => {
        return (
            <Container key={category} className='SidebarButtonContainer'>
                <Button variant="contained" className='SidebarButtons'>{category}</Button>
            </Container>
        );
    };
    
    const SidebarMenuButton = (category) => {
        return (
            <Container key={category} className='SidebarButtonContainer'>
                <Button 
                    disableElevation 
                    onClick={handleActiveSidebarMenu} 
                    value={category.toString()} 
                    variant='contained' 
                    className='SidebarButtonsInActive'
                >
                    {category}
                </Button> 
            </Container>
        );
    };


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

            fetch('/api/get-user-bookmarked-tools',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email: user.email
                })
            }).then((response) => response.json()).then((data) => {
                setUserBookmark(data.bookmarked_tool)
            });        
            
            setRefresher(!refresher)            
        });
    }

    

    const BookmarkIconToShow = (props) => {
        if (props.isBookmarked) {
            return (
                <BookmarkIcon sx={{fontSize:'35px', padding:'0px', color:'#434743'}}  />          
            )
        }else{
            return (
                <BookmarkBorderOutlinedIcon sx={{fontSize:'35px', padding:'0px', color:'#434743'}}  />
            )
        }
    }

    const displayUsers = allTools
    .slice(pagesVisited, pagesVisited + ToolsPerPage)
    .map((tool) => {
      return (
        <Grid item key={tool.id} md={2.3}>
            <Card sx={{ maxWidth: 345, backgroundColor:'#546263', color:'#f3f4ed', border:'1px solid #f3f4ed', borderRadius:3 }} elevation={0}>
                
                <CardHeader
                    avatar={
                        <IconButton aria-label="settings" sx={{ marginLeft:'12px', marginTop:'-3px' , padding:'0px', borderRadius:'0px'}}>
                            <BookmarkIconToShow isBookmarked={ BookmarkedTools.includes(tool.title) ? true : false } />
                        </IconButton>
                    }
                    sx={{
                        position:'absolute',
                        padding:'0px',
                        zIndex:'1999'
                    }}
                    onClick={() => _HandleAddBookmarkButtonPressed (tool.id, tool.title)}
                />

                <CardActionArea sx={{ minHeight:260, padding:'40px 20px 0px 20px' }} onClick={() => console.log(tool.title)}>
                    <img alt="Tool Image" src={ '/static' + tool.image } style={{ marginLeft:'50%', height:'100px', transform:'translate(-50%,0px)' }} />
                    <CardContent sx={{marginBottom:'20px'}}>
                        <Typography gutterBottom variant="h6" component="div" align='center' fontFamily='Montserrat Alternates' sx={{ lineHeight:'26px' }}>
                            { tool.title }
                        </Typography>
                        <Typography variant="body2" fontFamily='Montserrat Alternates' noWrap>
                            { tool.description }
                        </Typography>
                    </CardContent>
                    <CardContent>
                        {tool.categories.map((tool_category) => (
                            <Chip key={tool_category.id} label={tool_category.name} sx={{marginRight:'5px', color:'#fff'}} />
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
                
                <Box component="div" className='HeroMainDiv'>
                    <Grid container>
                        {/* <div style={CirclesDiv}>
                            <div style={ Circle1 } />
                            <div style={ Circle2 } />
                            <div style={ Circle3 } />
                            <div style={ Circle4 } />
                            <div style={ Circle5 } />
                            <div style={ Circle6 } />
                        </div> */}
                        <Grid item xs={12} md={6}>
                            <Box component="div" className='HeroLeftDiv'>
                                <img
                                    className='HeroImage'
                                    src="/static/images/Hero-img.png"
                                    alt="Helping each other vector"
                                    loading="lazy"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box component='div' className='HeroRightDiv'>
                                <Box component='div' className='HeroRightDivHeader'>
                                    <Box>
                                        <Typography display="inline" className='HeroPrimaryColoredHeading'>Work </Typography>
                                        <Typography display="inline" className='HeroSecondaryColoredHeading'>efficiently</Typography>
                                    </Box>
                                    <Box>
                                        <Typography display="inline" className='HeroPrimaryColoredHeading'>Grow </Typography>
                                        <Typography display="inline" className='HeroSecondaryColoredHeading'>continously</Typography>
                                    </Box>
                                    <Box>
                                        <Typography className='HeroSecondaryColoredSubHeader'>Growpal helps you find the best tools to keep you and your business stay ahead in the compitition. </Typography>

                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={12}>
                            <Box component='div' className='HeroArrowDown'>
                                <IconButton aria-label="menu" onClick={() => { window[`scrollTo`]({ top:960, behavior: `smooth` }) }}>
                                    <KeyboardDoubleArrowDownIcon style={{ fontSize: 34, color: '#546263' }} />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Parallax>

            <Box component="div" className='ToolsSearchDiv'>
                <Grid 
                    container 
                    spacing={4}
                    justifyContent='center'
                >
                    <Grid item md={7} >
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                            style={{
                                borderRadius: '25px',
                            }}
                        >
                            <IconButton onClick={ () => {} } sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Tool"
                                inputProps={{ 'aria-label': 'search tool' }}
                                onChange={_SearchedKeyChange}
                            />
                        </Paper>
                    </Grid>
                    {/* <Grid item md='auto'>
                        <div id="custom-select-parent">
                            <div id="custom-select">
                                <select onChange={handleFilterChange}>
                                    <option value="None">Filter</option>
                                    <option value="All Deals">All Deals</option>
                                    <option value="Freemium">Freemium</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Unlimited">Unlimited</option>
                                </select>
                            </div>
                        </div>                            
                    </Grid>

                    <Grid item md='auto'>
                        <div id="custom-select-parent">
                            <div id="custom-select">
                                <select onChange={handleOrderChange}>
                                    <option value="0">Sort</option>
                                    <option value={"Most Popular"}>Most Popular</option>
                                    <option value={"Least Popular"}>Least Popular</option>
                                    <option value={"Latest"}>Latest</option>
                                    <option value={"Oldest"}>Oldest</option>
                                </select>
                            </div>
                        </div>
                    </Grid> */}
                    
                </Grid>
            </Box>
            <Box component="div" className='ToolsContentsDiv'>
                <Grid sx={{ flexGrow: 1 }} container spacing={3}>
                    <Grid 
                        item 
                        style={{
                            padding: '0px 0px 50px 50px'
                        }} 
                        lg={2}
                        md={3}
                        sm={4}
                        xs={5}
                    >
                        <Box 
                            component='div'
                            style={{
                                backgroundColor: '#434743',
                                borderRadius: '20px',
                                padding: '50px 15px 50px 15px'
                            }}
                        >                                   
                            {categories.map((category) => (
                                category === activeCategory ? ActiveSidebarMenuButton(category) : SidebarMenuButton(category) 
                            ))}   
                        </Box>
                    </Grid>
                    <Grid 
                        item 
                        style={{ 
                            padding: '0 0 0 30px'
                        }} 
                        md={10}
                        sm={8}
                        xs={7}
                    >
                        <Grid container spacing={4}>
                            {displayUsers}

                            <Grid item md={2.3}>
                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                />
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Box component="div" className='ContactUsSection' >
                <Grid container height='100%'>
                    <Grid sx={{ position:'relative' }}>
                        <Paper style={{
                            height: '45px',
                            width: '45px',
                            backgroundColor: '#c06115',
                            borderRadius: '50%',
                            position: 'absolute',
                            top:'10%',
                            left:'100px',

                        }}></Paper>

                        <Paper style={{
                            height: '90px',
                            width: '90px',
                            backgroundColor: '#434743',
                            borderRadius: '50%',
                            position: 'absolute',
                            top:'45%',
                            left:'170px',

                        }}></Paper>

                        <Paper style={{
                            height: '40px',
                            width: '40px',
                            backgroundColor: '#c06115',
                            borderRadius: '50%',
                            position: 'absolute',
                            top:'52%',
                            left:'1780px',

                        }}></Paper>

                        <Paper style={{
                            height: '100px',
                            width: '100px',
                            backgroundColor: '#434743',
                            borderRadius: '50%',
                            position: 'absolute',
                            top:'80%',
                            left:'1580px',

                        }}></Paper>

                    </Grid>
                    <Grid item className='ContactUsLeftContainer' md={6} >
                        <Box>
                            <Typography 
                                variant='h1'
                                component='h2' 
                                noWrap
                                className='ContactUsLeftContainerHeader'
                            >
                                Need help?
                            </Typography>
                            <Typography component='p' className='ContactUsLeftContainerSubHeader'>
                                Tell us your concerns whether you're curious about certain features, pricing, or even bundle deals.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
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
                    <Grid item className='ContactUsRightContainer' md={6}>
                        <Box
                            style={{
                                width: '100%',  
                            }}
                        >
                            
                            <TextField 
                                id="outlined-basic" 
                                label="Name" 
                                variant="outlined" 
                                InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                                InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                                sx={{ 
                                    width: '70%',
                                    marginBottom: '25px',
                                                                            
                                }}
                            />
                            <TextField 
                                id="outlined-basic" 
                                label="Email" 
                                variant="outlined" 
                                InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                                InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                                sx={{ 
                                    width: '70%',
                                    marginBottom: '25px',
                                                                        
                                }}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows={4}
                                InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                                InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                                sx={{ 
                                    width: '70%',
                                    marginBottom: '25px',
                                                                        
                                }}
                            />
                            <Box>
                                <Button className='ContactUsRightContainerSendButton' to="/" component={Link}>
                                    Send
                                </Button>
                            </Box>
                        </Box>
                        
                    </Grid>
                    
                </Grid>
            </Box>

            <FooterComponent />
        </Box>
    ); 
}