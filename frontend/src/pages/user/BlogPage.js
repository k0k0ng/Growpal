import React, { useState, useEffect } from 'react'
import Axios from 'axios';

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';

import { Box, Typography, Card, CardActions, CardContent, CardMedia, Button, Grid, CardActionArea, Chip } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

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

    const DisplayBlogs = () => {
        if(blogs.length === 0) return;
        return (
            blogs.map((blog) => (
                
                <div key={blog.id}>
                    <Card>
                        <CardActionArea className={'blog-card-action-area'} onClick={() => {console.log(blog.title.rendered); }} >
                            <img alt="Blog Image" src={ '/static/images/hero-image.png' } className='blog-image' />
                            <CardContent sx={{marginBottom:'20px', alignContent:'center' }}>
                                <Typography gutterBottom variant="h5" component="div" align='center' className='blog-title'>
                                    {blog.title.rendered}
                            </Typography>

                            <pre 
                                dangerouslySetInnerHTML={{ __html:blog.excerpt.rendered }} 
                                variant="body1" 
                                className='blog-description'
                            />

                            </CardContent>
                        </CardActionArea>
                    </Card>
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
