import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Axios from 'axios';
import { compareAsc, format } from 'date-fns'

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';

import { 
    Avatar,
    Box, 
    Typography, 
    Card, 
    CardHeader,
    CardActions, 
    CardContent, 
    CardMedia, 
    Button, 
    Grid, 
    CardActionArea, 
    Chip,
    IconButton 
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import ShareIcon from '@mui/icons-material/Share';

export default function BlogPage() {
    const [blogs, setBlogs] = useState(() => { return []; });

    useEffect(() => {
        Axios.get('http://localhost:8000/wp-json/wp/v2/posts')
        .then((result) => {
            setBlogs(result.data);
        }).catch(err => {
            console.log("============ Error =============")
            console.log(err.response);
            console.log("================================")
        });
    },[]);

    useEffect(() => {
        console.log(blogs);
    },[blogs]);

    const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const DisplayBlogs = () => {
        if(blogs.length === 0) return;
        return (
            blogs.map((blog) => (
                
                <div key={blog.id}>
                    <Card>
                        <Typography variant='body1' sx={{ color:'#546263', fontFamily:'Montserrat Alternates', textAlign:'center' }}>
                            {format(new Date(blog.date), 'MMM d, yyyy')}
                        </Typography>
                        <Typography variant='h4' sx={{ textAlign:'center' }}>
                            {blog.title.rendered}
                        </Typography>
                        <CardMedia
                            component="img"
                            // height="140"
                            image="/static/images/hero-image.png"
                            alt="green iguana"
                        />
                        <CardContent>
                            <pre 
                                dangerouslySetInnerHTML={{ __html:blog.excerpt.rendered }} 
                                variant="body1" 
                                className='blog-description'
                            />
                        </CardContent>
                        <CardActions>
                            <Button 
                                sx={{
                                    color: '#f3f4ed',
                                    backgroundColor: '#c06115',
                                    fontFamily: 'Montserrat Alternates',
                                    textTransform: "none"
                                }} 
                                disableElevation
                                variant={'contained'}
                            >
                                Continue Reading
                            </Button>
                        </CardActions>
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: '#546263' }} aria-label="recipe">
                                R
                            </Avatar>
                            }
                            action={
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            }
                            title={blog.title.rendered}
                        />
                    </Card>
{/* 
                    <Card>
                        <CardActionArea className={'blog-card-action-area'} onClick={() => {console.log(blog.title.rendered); }} >
                            
                            <CardContent sx={{marginBottom:'20px', alignContent:'center' }}>
                                <Typography gutterBottom variant="h5" component="div" align='center' className='blog-title'>
                                    {blog.title.rendered}
                                </Typography>

                                <img alt="Blog Image" src={ '/static/images/hero-image.png' } className='blog-image' />

                                
                            </CardContent>
                        </CardActionArea>
                    </Card> */}
                </div>
                
            ))

            // blogs.map((blog) => {
            //     return (
            //         <Grid item md={6} key={blog.id} sx={{ border:'1px solid red', display:'flex', justifyContent:'center' }} >
            //             <Card sx={{ border:'1px solid blue', justifyContent:'center' }} >
            //                 <CardActionArea className={'blog-card-action-area'} onClick={() => {console.log(blog.title.rendered); }} >
            //                     <img alt="Blog Image" src={ '/static/images/hero-image.png' } className='blog-image' />
            //                     <CardContent sx={{marginBottom:'20px', border:'1px solid magenta', alignContent:'center' }}>
            //                         <Typography gutterBottom variant="h5" component="div" align='center' className='blog-title'>
            //                             {blog.title.rendered}
            //                         </Typography>
            //                         {blog.categories.map((blog_category) => (
            //                             <Chip key={blog_category} label={blog_category} className='blog-category-chip' />
            //                         ))} 
            //                         <Typography variant="body2" className='blog-description'>
            //                             {blog.content.rendered}
            //                         </Typography>
            //                     </CardContent>
            //                 </CardActionArea>
            //             </Card>
            //         </Grid>
            //     )
            // })
        );
    }

    const contentBox = '500px';

    return (
        <Box>
            <TopNavComponent />
            
            <Box className='blogs-container'>
                <Typography 
                    variant='h3' 
                    sx={{ 
                        // border:'1px solid blue', 
                        textAlign:'center',
                        marginBottom:'2%',
                        color:'#c06115',
                        fontFamily:'Montserrat Alternates'
                    }}
                >
                    Blogs
                </Typography>
                
                {/* <Grid container sx={{ border:'1px solid red', justifyContent:'center' }} spacing={5}>
                    { DisplayBlogs() }
                </Grid> */}

                <Box sx={{ padding:'0% 5%', display:'flex', justifyContent:'center' }}>
                    <Masonry columns={{xs: 1, md: 2}} spacing={4} >
                        { DisplayBlogs() }
                    </Masonry>
                </Box>
            </Box>
            

            <FooterComponent />
        </Box>
    );
}
