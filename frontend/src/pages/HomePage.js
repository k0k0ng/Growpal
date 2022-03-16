import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import TopNavComponent from '../components/TopNavComponent';
import LoginPage from './LoginPage';
import AdminDashboardPage from './AdminDashboardPage';
import CreateToolComponent from './CreateToolPage';
import Tools from '../components/Tools';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route
} from "react-router-dom";
import { Container, Typography, makeStyles, Box, TextField, Grid, Button, InputLabel, MenuItem, FormControl, Select, FormHelperText } from '@material-ui/core';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

const useStyle = makeStyles({
    PrimaryColoredHeading: {
        color: "#c06115",
        fontSize: 56,
        fontFamily: 'Montserrat Alternates',
        fontWeight: 600,
    },
    SecondaryColoredHeading: {
        color: "#546263",
        fontSize: 56,
        fontFamily: 'Montserrat Alternates',
        fontWeight: 600,
    },
    SecondaryColoredText: {
        color: "#546263",
        fontSize: 18,
        fontFamily: 'Montserrat Alternates',
        fontWeight: 400,
        width: '60%',
        marginTop: 40,
        lineHeight: 2
    },
    FontMontserrat: {
        fontFamily: 'Montserrat Alternates',
        textTransform: "none"
    },
    
})

const HeroMainDiv = {
    position: 'relative',
    display: 'flex',
    height:890,
    backgroundColor: '#f3f4ed',
    //border: '1px solid red',

}

const HeroLeftDiv = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    //border: '1px solid green',
    height:'100%',
    width: '50%'

}

const HeroImg = {
    width: 500,
    margin: '10%',
    //border: '1px solid red'
}

const HeroRightDiv = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    height:'100%',
    padding: '0 4%',
    //border: '1px solid red',

}

const HeroTextDiv = {
    transform: 'translate(0, -15%)',
    //border: '1px solid red',
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
    width: '100%'
}

const Circle1 = {
    position: 'absolute',
    top: '10%',
    left: '40%',
    backgroundColor: '#434743',
    height: 75,
    width: 75,
    borderRadius: '50%'
}

const Circle2 = {
    position: 'absolute',
    top: '20%',
    left: '10%',
    backgroundColor: '#434743',
    height: 35,
    width: 35,
    borderRadius: '50%'
}

const Circle3 = {
    position: 'absolute',
    top: '5%',
    right: '-8%',
    backgroundColor: '#434743',
    height: 300,
    width: 300,
    borderRadius: '50%'
}

const Circle4 = {
    position: 'absolute',
    top: '70%',
    left: '15%',
    backgroundColor: '#c06115',
    height: 50,
    width: 50,
    borderRadius: '50%'
}

const Circle5 = {
    position: 'absolute',
    top: '65%',
    left: '75%',
    backgroundColor: '#c06115',
    height: 35,
    width: 35,
    borderRadius: '50%'
}

const Circle6 = {
    position: 'absolute',
    top: '68%',
    left: '65%',
    backgroundColor: '#434743',
    height: 58,
    width: 58,
    borderRadius: '50%'
}


const ToolsMainDiv = {
    position: 'relative',
    display: 'flex',
    height:890,
    width: ' 100%',
    backgroundColor: '#546263',
    //border: '1px solid red',

}

const ContentsHeader = {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 500,
    
}

export default function HomePage() {
    const classes = useStyle();
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    function HomePageContents() {
        return (
            <div>
                <TopNavComponent />
                <Container 
                    maxWidth="xl"
                    disableGutters={true}
                    component="div"
                    style={ HeroMainDiv }
                >
                    <Grid container>
                        <div style={CirclesDiv}>
                            <div style={ Circle1 } />

                            <div style={ Circle2 } />

                            <div style={ Circle3 } />

                            <div style={ Circle4 } />

                            <div style={ Circle5 } />

                            <div style={ Circle6 } />

                        </div>
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
                                        <Typography display="inline" className={classes.PrimaryColoredHeading}>Work </Typography>
                                        <Typography display="inline" className={classes.SecondaryColoredHeading}>efficiently</Typography>
                                    </Box>
                                    <Box>
                                        <Typography display="inline" className={classes.PrimaryColoredHeading}>Grow </Typography>
                                        <Typography display="inline" className={classes.SecondaryColoredHeading}>continously</Typography>
                                    </Box>
                                    <Box>
                                        <Typography className={classes.SecondaryColoredText}>Growpal helps you find the best tools to keep you and your business stay ahead in the compitition. </Typography>

                                    </Box>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={12}>
                            <div style={HeroArrowDown}>
                                <Button>
                                    <KeyboardArrowDownRoundedIcon style={{ fontSize: 48, color: '#546263' }} />
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                
                </Container>
                <Container
                    maxWidth="xl"
                    disableGutters={true}
                    component="div"
                    style={ ToolsMainDiv }
                >
                    <Grid container>
                        <Grid item md={12}>
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <Button 
                                style={{
                                    color: 'white',
                                    borderRadius: 25,
                                    backgroundColor: "#434743",
                                    padding: "10px 30px",
                                    marginRight: 20
                                }} 
                                to="/" 
                                component={Link}
                                className={classes.FontMontserrat}
                            >
                                Sign Up
                            </Button>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>
                            <Button 
                                style={{
                                    color: 'white',
                                    borderRadius: 25,
                                    backgroundColor: "#434743",
                                    padding: "10px 30px",
                                    marginRight: 20
                                }} 
                                to="/" 
                                component={Link}
                                className={classes.FontMontserrat}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        
                    </Grid>
                </Container>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={
                    HomePageContents()
                } />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/admin-dashboard' element={<AdminDashboardPage />} />
                <Route path='/create-tool' element={<CreateToolComponent />} />
                <Route path='/view-tool/:toolID' element={<Tools />} />
            </Routes>
        </Router>
    ); 
}