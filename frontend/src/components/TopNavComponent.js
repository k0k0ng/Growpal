import React, {useState, useContext} from 'react';
import { Link, useNavigate } from "react-router-dom"

import AuthContext from '../context/AuthContext';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';

const pages = [
    {id:1, page_name:'Admin', page_url:'/admin-dashboard'},
    {id:2, page_name:'Create Tool', page_url:'/create-tool'},
    {id:3, page_name:'Login', page_url:'/login'}
    ];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function TopNavComponent () {
    const navigate = useNavigate()
    const {authTokens, setUser, setUserBookmark, setAuthTokens, UserAccountImage} = useContext(AuthContext);
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

    const handleGoToProfileBookmarks = () => {
        setAnchorElUser(null);
        localStorage.setItem('PanelToShow', "Bookmark")
        navigate('/profile');
    }

    const handleGoToProfileSettings = () => {
        setAnchorElUser(null);
        localStorage.setItem('PanelToShow', "Settings")
        navigate('/profile');
    }


    const handleLogoutUserMenu = () => {
        setAnchorElUser(null);
        setUser(null);
        setUserBookmark(null);
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
        console.log("Logout Success");
        navigate('/');
    };

    const isLoggedIn = authTokens? true : false;

    const RenderProfileImage = () => {
        if(UserAccountImage){
            return <Avatar alt="User Image" src = {'/static'+ UserAccountImage} height='150px' />
        }else{
            return <Avatar alt="User Image" src = '/static/images/default_avatar.png' height='150px' />
        }
    }

    function LoggedInButtons (){
        return(
            <Box sx={{ flexGrow: 0 }}>
                <Button 
                    variant='text' 
                    to="/blog"
                    component={Link}
                    className="nav-button"
                    sx={{ marginRight:'25px'}}
                >
                    BLOGS
                </Button>

                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}>
                        {RenderProfileImage()}
                    </IconButton>
                </Tooltip>  
                <Menu
                    sx={{ mt: '60px' }}
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
                    
                    <MenuItem className="nav-menu-links" onClick={handleGoToProfileBookmarks}>
                        <Typography align="center">Bookmark</Typography>
                    </MenuItem>
                    <MenuItem className="nav-menu-links" onClick={handleGoToProfileSettings}>
                        <Typography align="center">Settings</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem className="nav-menu-links" onClick={handleLogoutUserMenu}>
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
                        className="nav-button" 
                        sx={{ marginRight:'25px'}}
                        to="/blog" 
                        component={Link}
                        variant={'text'}
                    >
                        BLOGS
                    </Button>

                    <Button 
                        className="nav-sign-up-button"
                        to="/register" 
                        component={Link}
                    >
                        Sign Up
                    </Button>

                    <Button 
                        className="nav-button" 
                        to="/login" 
                        component={Link}
                        variant={'text'}
                    >
                        Sign In
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                    <Button 
                        className="nav-button"
                        sx={{ marginRight:'25px'}} 
                        to="/blog" 
                        component={Link}
                        variant={'text'}
                    >
                        BLOGS
                    </Button>

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
                            mt: '60px',
                        }}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button 
                                variant='text' 
                                to="/register"
                                component={Link}
                                className='nav-burger-links'
                            >
                                Sign Up
                            </Button>
                        </MenuItem>

                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button 
                                variant='text' 
                                to="/login"
                                component={Link}
                                className='nav-burger-links'
                            >
                                Login
                            </Button>
                        </MenuItem>
                    </Menu>
                </Box>
            </div>
        );
    }

    return (    
        <AppBar position="static" className='nav-container'>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                    <Button
                        to="/"
                        component={Link}
                        variant="text"
                        className='nav-brand-logo'
                    >
                        Growpal
                    </Button>
                </Box>

                { isLoggedIn ? LoggedInButtons() : LoggedOutButtons() }
            </Toolbar>
        </AppBar>
    );
    
}