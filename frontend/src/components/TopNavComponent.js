import React, {useState, useContext} from 'react';
import { Link, useNavigate } from "react-router-dom"
import AuthContext from '../context/AuthContext';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';


const logoStyles = {
    color: "#fff",
    fontSize: 28,
    fontFamily: 'Arvo',
    textTransform: "none"
}

const navContainer = {
    backgroundColor: '#546263'
}

const FontMontserrat = {
    fontFamily: 'Montserrat Alternates',
    textTransform: "none"
}

const pages = [
    {id:1, page_name:'Admin', page_url:'/admin-dashboard'},
    {id:2, page_name:'Create Tool', page_url:'/create-tool'},
    {id:3, page_name:'Login', page_url:'/login'}
    ];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function TopNavComponent () {
    const navigate = useNavigate()
    const {authTokens, setAuthTokens, setUser} = useContext(AuthContext);
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

    const handleLogoutUserMenu = () => {
        setAnchorElUser(null);
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        console.log("Logout Success")
        navigate('/')
    };

    const isLoggedIn = authTokens? true : false;


    function LoggedInButtons (){
        return(
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px', position: 'absolute' }}
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
                    
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography align="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography align="center">Account</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography align="center">Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogoutUserMenu}>
                        <Typography align="center">Logout</Typography>
                    </MenuItem>
                    
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
                            padding: "7px 35px",
                            marginRight: 20,
                            fontFamily: 'Montserrat Alternates',
                            textTransform: "none"
                        }} 
                        to="/register" 
                        component={Link}
                    >
                        Sign Up
                    </Button>

                    <Button 
                        style={{
                            color: 'white',
                            fontFamily: 'Montserrat Alternates',
                            textTransform: "none"
                        }} 
                        to="/login" 
                        component={Link}
                        variant={'text'}
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
                                style={FontMontserrat}
                            >
                                Sign Up
                            </Button>
                        </MenuItem>

                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button 
                                variant='text' 
                                to="/login"
                                component={Link}
                                style={FontMontserrat}
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
        <AppBar position="static" style={navContainer}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                        <Button
                            to="/"
                            component={Link}
                            variant="text"
                            sx={{ mr: 2 }}
                            style={logoStyles}
                        >
                            Growpal
                        </Button>
                    </Box>

                    { isLoggedIn ? LoggedInButtons() : LoggedOutButtons() }
                </Toolbar>
        </AppBar>

        // <Container
        //     style={navContainer}
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