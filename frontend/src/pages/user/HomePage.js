import React, { useState, useEffect, useContext } from 'react';

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';

import { Parallax } from 'react-parallax'

import { Link } from "react-router-dom";

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';

import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Chip from '@mui/material/Chip';

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

import AuthContext from '../../context/AuthContext';


const PrimaryColoredHeading = {
        color: "#c06115",
        fontSize: 56,
        fontFamily: 'Montserrat Alternates',
        fontWeight: 600,
    }
    
const SecondaryColoredHeading = {
        color: "#546263",
        fontSize: 56,
        fontFamily: 'Montserrat Alternates',
        fontWeight: 600,
    }

const SecondaryColoredText = {
        color: "#546263",
        fontSize: 18,
        fontFamily: 'Montserrat Alternates',
        fontWeight: 400,
        width: '60%',
        marginTop: 40,
        lineHeight: 2,
    }

const ButtonStyle = {
        color: 'white',
        borderRadius: 25,
        backgroundColor: "#434743",
        padding: "10px 30px",
        marginRight: 20,
        fontFamily: 'Montserrat Alternates',
        textTransform: "none",
    }

const HeroMainDiv = {
    position: 'relative',
    display: 'flex',
    height:890,
    //backgroundColor: '#f3f4ed',
    //border: '1px solid red',

}

const HeroLeftDiv = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    height:'100%',
    width: '50%',

}

const HeroImg = {
    width: 500,
    margin: '10%',
}

const HeroRightDiv = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    height:'100%',
    padding: '0 4%',

}

const HeroTextDiv = {
    transform: 'translate(0, -15%)',
}

const HeroArrowDown = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: '5%',
}

const CirclesDiv = {
    position: 'absolute',
    display: 'flex',
    border: '1px solid green',
    height:'100%',
    width: '100%',
}

const Circle1 = {
    position: 'absolute',
    top: '10%',
    left: '40%',
    backgroundColor: '#434743',
    height: 75,
    width: 75,
    borderRadius: '50%',
}

const Circle2 = {
    position: 'absolute',
    top: '20%',
    left: '10%',
    backgroundColor: '#434743',
    height: 35,
    width: 35,
    borderRadius: '50%',
}

const Circle3 = {
    position: 'absolute',
    top: '5%',
    right: '-8%',
    backgroundColor: '#434743',
    height: 300,
    width: 300,
    borderRadius: '50%',
}

const Circle4 = {
    position: 'absolute',
    top: '70%',
    left: '15%',
    backgroundColor: '#c06115',
    height: 50,
    width: 50,
    borderRadius: '50%',
}

const Circle5 = {
    position: 'absolute',
    top: '65%',
    left: '75%',
    backgroundColor: '#c06115',
    height: 35,
    width: 35,
    borderRadius: '50%',
}

const Circle6 = {
    position: 'absolute',
    top: '68%',
    left: '65%',
    backgroundColor: '#434743',
    height: 58,
    width: 58,
    borderRadius: '50%',
}


const ToolsSearchDiv = {
    position: 'relative',
    display: 'flex',
    height:100,
    width: ' 100%',
    backgroundColor: '#546263',
    paddingTop: '45px',
}

const ToolsContentsDiv = {
    position: 'relative',
    display: 'flex',
    width: ' 100%',
    paddingTop: '25px',
    paddingBottom: '45px',
    backgroundColor: '#546263',
}

const ContentsHeader = {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 500,
    
}

const SidebarButtonContainer = {
    display: 'flex',
    width: '100%',
    marginBottom: '20px',
    justifyContent: 'center',
}

const SidebarButtons = {
    fontFamily: 'Montserrat Alternates',
    fontWeight: 500,
    fontSize: '11px',
    color: '#434743',
    backgroundColor: '#f3f4ed',
    borderRadius: '25px',
    padding: '5px 30px',
}

const SidebarButtonsInActive = {
    fontFamily: 'Montserrat Alternates',
    fontWeight: 500,
    fontSize: '11px',
    color: '#f3f4ed',
    backgroundColor: '#434743',
    padding: '5px 30px',
}

const ContactUsSection = {
    backgroundColor: '#f3f4ed',
    height: '620px',
}

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
    const [expanded, setExpanded] = useState(false);
    const [refresher, setRefresher] = useState(true);
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [activeCategory, setActiveCategory] = useState(() => {
        return "All Tools";
    });

    const [allTools, setAllTools] = useState(() => {
        return [];
    })

    useEffect(() => {
        getToolS();
    },[]);

    function getToolS(){
        fetch('/api/get-tools').then((response) => response.json()).then((data) => {
            setAllTools(data)
        });
    }


    const [filter, setFilter] = useState();
    const [order, setOrder] = useState();
    
    const handleActiveSidebarMenu = (event) => {
        setActiveCategory( prevValue => prevValue = event.currentTarget.value);
    };

    const handleFilterChange = (event) => {
        setFilter( prevValue => prevValue = event.target.value);
    };

    const handleOrderChange = (event) => {
        setOrder( prevValue => prevValue = event.target.value);
    };


    const ActiveSidebarMenuButton = (category) => {
        return (
            <Container key={category} style={SidebarButtonContainer}>
                <Button variant="contained" style={ SidebarButtons }>{category}</Button>
            </Container>
        );
    };
    
    const SidebarMenuButton = (category) => {
        return (
            <Container key={category} style={SidebarButtonContainer}>
                <Button 
                    disableElevation 
                    onClick={handleActiveSidebarMenu} 
                    value={category.toString()} 
                    variant="contained" 
                    style={ SidebarButtonsInActive }
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

    return (
        <div>
                <TopNavComponent /> 
                <Parallax bgImage={herobg} strength={200}>
                    
                    <Box
                        component="div"
                        style={ HeroMainDiv }
                    >
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
                                <div style={HeroLeftDiv}>
                                    <img
                                        style={ HeroImg }
                                        src="/static/images/Hero-img.png"
                                        alt="Helping each other vector"
                                        loading="lazy"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={HeroRightDiv}>
                                    <div style={HeroTextDiv}>
                                        <Box>
                                            <Typography display="inline" style={PrimaryColoredHeading}>Work </Typography>
                                            <Typography display="inline" style={SecondaryColoredHeading}>efficiently</Typography>
                                        </Box>
                                        <Box>
                                            <Typography display="inline" style={PrimaryColoredHeading}>Grow </Typography>
                                            <Typography display="inline" style={SecondaryColoredHeading}>continously</Typography>
                                        </Box>
                                        <Box>
                                            <Typography style={SecondaryColoredText}>Growpal helps you find the best tools to keep you and your business stay ahead in the compitition. </Typography>

                                        </Box>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={12}>
                                <div style={HeroArrowDown}>
                                    <IconButton aria-label="menu" onClick={() => { window[`scrollTo`]({ top:960, behavior: `smooth` }) }}>
                                        <KeyboardDoubleArrowDownIcon style={{ fontSize: 34, color: '#546263' }} />
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
                    
                    </Box>
                </Parallax>

                <Box
                    component="div"
                    style={ ToolsSearchDiv }
                >
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
                                    inputProps={{ 'aria-label': 'search google maps' }}
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
                <Box
                    component="div"
                    style={ ToolsContentsDiv }
                >
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

                                {allTools.map((tool) => (
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
                                                    {/* <Chip label="Editing" />
                                                    <Chip label="Arts" /> */}
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    component="div"
                    style={ ContactUsSection }
                >
                    <Grid container height='100%'>
                        <Grid
                            style={{
                                position:'relative'
                            }}
                        >
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
                        <Grid 
                            item 
                            style={{
                                height: '100%',
                                zIndex: '1500',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                align: 'right',
                                padding: '0 40px 0 0'
                            }}
                            md={6}
                        >
                            <Box>
                                <Typography 
                                    variant='h1'
                                    component='h2' 
                                    noWrap
                                    style={{  
                                        textAlign:'end',
                                        fontFamily: 'Montserrat Alternates',
                                        fontWeight: '700',
                                        marginBottom: '40px',
                                        color: '#546263'
                                    }}
                                >
                                    Need help?
                                </Typography>
                                <Typography 
                                    component='p' 
                                    style={{ 
                                        textAlign:'end',
                                        fontFamily: 'Montserrat Alternates',
                                        fontSize: '18',
                                        fontWeight: '400',
                                        lineHeight: '2',
                                        marginBottom: '40px',
                                        marginLeft: '25%',
                                        color: '#546263'
                                    }}
                                >
                                    Tell us your concerns whether you're curious about certain features, pricing, or even bundle deals.
                                </Typography>
                                <Box style={{ display: 'flex', justifyContent: 'end' }}>
                                    <IconButton href={"https://www.linkedin.com"} aria-label="menu">
                                        <LinkedInIcon style={{ fontSize: 34, color: '#434743' }} />
                                    </IconButton>
                                    <IconButton href={"https://facebook.com"} aria-label="menu">
                                        <FacebookIcon style={{ fontSize: 34, color: '#434743' }} />
                                    </IconButton>
                                    <IconButton href={"https://gmail.com"} aria-label="menu">
                                        <MailIcon style={{ fontSize: 34, color: '#434743' }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid 
                            item 
                            style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 0 0 40px'
                            }}
                            md={6}
                        >
                            <Box
                                style={{
                                    width: '100%',
                                    fontFamily: 'Montserrat Alternates'   
                                }}
                            >
                                
                                <TextField 
                                    id="outlined-basic" 
                                    label="Name" 
                                    variant="outlined" 
                                    InputProps={{ style: { fontFamily:'Montserrat Alternates' } }}
                                    InputLabelProps={{ style: { fontFamily:'Montserrat Alternates', fontStyle: 'italic' } }}
                                    style={{ 
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
                                    style={{ 
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
                                    style={{ 
                                        width: '70%',
                                        marginBottom: '25px',
                                                                            
                                    }}
                                />
                                <Box>
                                    <Button 
                                        style={{
                                            color: 'white',
                                            borderRadius: 25,
                                            backgroundColor: "#c06115",
                                            padding: "10px 45px",
                                            marginRight: 20,
                                            fontFamily: 'Montserrat Alternates',
                                            textTransform: "none"
                                        }} 
                                        to="/" 
                                        component={Link}
                                    >
                                        Send
                                    </Button>
                                </Box>
                            </Box>
                            
                        </Grid>
                        
                    </Grid>
                </Box>

                <FooterComponent />
            </div>
    ); 
}