import React, {useState} from 'react';
// import { Grid, Button, ButtonGroup, TextField, Container, makeStyles} from "@material-ui/core"
import { Link, useNavigate } from "react-router-dom"

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    logoStyles: {
        color: "#fff",
        fontSize: 28,
        fontFamily: 'Arvo',
        textTransform: "none"
    },
    navContainer: {
        backgroundColor: '#546263'
    },
    buttonMarginRight: {
        marginInlineEnd: 20
    },
    FontMontserrat: {
        fontFamily: 'Montserrat Alternates',
        textTransform: "none"
    },
})
const pages = [
    {id:1, page_name:'Admin', page_url:'/admin-dashboard'},
    {id:2, page_name:'Create Tool', page_url:'/create-tool'},
    {id:3, page_name:'Login', page_url:'/login'}
    ];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function TopNavComponent () {
    const classes = useStyle();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const isLoggedIn = false;


    function LoggedInButtons (){
        return(
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/2.jpg" />
                </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography align="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
        );
    }

    function LoggedOutButtons (){
        return(
            <div>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                    <Button 
                        style={{
                            color: 'white',
                            borderRadius: 25,
                            backgroundColor: "#c06115",
                            padding: "10px 30px",
                            marginRight: 20
                        }} 
                        to="/" 
                        component={Link}
                        className={classes.FontMontserrat}
                    >
                        Sign Up
                    </Button>
                    <Button 
                        style={{
                            color: 'white'
                        }} 
                        to="/" 
                        component={Link}
                        variant={'text'}
                        className={classes.FontMontserrat}
                    >
                        Sign In
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size='medium'
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}

                    >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Button 
                                    variant='text' 
                                    to="/sign-up"
                                    component={Link}
                                >
                                    Sign Up
                                </Button>
                            </MenuItem>

                            <MenuItem onClick={handleCloseNavMenu}>
                                <Button 
                                    variant='text' 
                                    to="/login"
                                    component={Link}
                                >
                                    Login
                                </Button>
                            </MenuItem>

                            
                        
                    </Menu>
                </Box>
            </div>
        );
    }

    // const navigate = useNavigate(); 

    // const [toolID, setToolID] = useState(() => {
    //     return "";
    // });

    // function _viewToolBtnPressed(){
    //     navigate("/view-tool/"+toolID)
    // }

    // function _setToolID(e){
    //     setToolID( prevValue => prevValue = e.target.value);
    // }

    return (
        <AppBar position="static">
            <Container 
                className={classes.navContainer}
                maxWidth="xl"
            >
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                        <Button
                            to="/"
                            component={Link}
                            variant="text"
                            sx={{ mr: 2 }}
                            className={classes.logoStyles}
                        >
                            Growpal
                        </Button>
                    </Box>
                    

                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='medium'
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.page_name} onClick={handleCloseNavMenu}>
                                    <Button 
                                        variant='text' 
                                        to={page.page_url} 
                                        component={Link}
                                    >
                                        {page.page_name}
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.page_name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                to={page.page_url} 
                                component={Link}
                            >
                                {page.page_name}
                            </Button>
                        ))}
                    </Box> */}

                    { isLoggedIn ? LoggedInButtons() : LoggedOutButtons() }
                      
                </Toolbar>
            </Container>
        </AppBar>
        // <Container
        //     className={classes.navContainer}
        //     maxWidth="xl"
        //     disableGutters={true}
        // >
        //     <Grid container spacing={3}>
        //         <Grid item xs={6} align="center">
        //             <ButtonGroup variant='contained'>
        //                 <Button 
        //                     style={{
        //                         color: 'white',
        //                         borderRadius: 25,
        //                         backgroundColor: "#c06115",
        //                         padding: "10px 30px"
        //                     }} 
        //                     to="/" 
        //                     component={Link}
        //                 >
        //                     Sign Up
        //                 </Button>
        //                 <Button 
        //                     style={{
        //                         color: 'white'
        //                     }} 
        //                     to="/" 
        //                     component={Link}
        //                     variant={'text'}
        //                 >
        //                     Sign In
        //                 </Button>
        //                 <Button 
        //                     style={{
        //                         color: 'white',
        //                         borderRadius: 25,
        //                         backgroundColor: "#c06115",
        //                         padding: "10px 30px"
        //                     }} 
        //                     to="/" 
        //                     component={Link}
        //                 >
        //                     Home
        //                 </Button>
        //                 <Button color='primary' to="/login" component={Link}>Login</Button>
        //                 <Button color='secondary' to="/admin-dashboard" component={Link}>Admin Dashboard</Button>
        //                 <Button color='primary' to="/create-tool" component={Link}>Create Tool</Button>
        //             </ButtonGroup>
        //         </Grid>
        //         <Grid item xs={6} align="center">
        //             <TextField label="Tool ID" variant="outlined" onChange={_setToolID}/>
        //             <Button variant='contained' color='default' size='large' onClick={_viewToolBtnPressed}>View Tool</Button>
        //         </Grid>
        //     </Grid>
        // </Container>
    );
    
}