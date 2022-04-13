import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import axios from 'axios';

import { 
    Avatar,
    Box,
    Typography, 
    Card, 
    CardHeader,
    CardActions, 
    CardContent, 
    Button, 
    Divider,
    IconButton,
    Grid
} from '@mui/material';

import CircleIcon from '@mui/icons-material/Circle';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function BlogItemComponent({blog}) {
    const navigate = useNavigate(); 
    const [blogImageURL, setBlogImageURL] = useState(() => {return "";});
    const [authorName, setAuthorName] = useState(() => {return "";});
    const [isLoaded, setIsLoaded] = useState(() => { return false; });
    const [currentCat, setCurrentCat] = useState(() => {return [];});

    useEffect(()=>{
        if(blog.featured_media !== 0){
            const getBlogImage = axios.get(`http://localhost:8000/wp-json/wp/v2/media/${blog.featured_media}`);
            const getBlogAuthor = axios.get(`http://localhost:8000/wp-json/wp/v2/users/${blog.author}`);

            Promise.all([getBlogImage, getBlogAuthor]).then(response => {
                setBlogImageURL(response[0].data.media_details.sizes.full.source_url);
                setAuthorName(response[1].data.name);
                // setIsLoaded(true);
            })
        }else{
            axios.get(`http://localhost:8000/wp-json/wp/v2/users/${blog.author}`)
            .then(response => {
                setAuthorName(response.data.name);
                // setIsLoaded(true);
            })
        }

        if(blog.categories.length > 0){
            axios.get(`http://localhost:8000/wp-json/wp/v2/categories`)
            .then(response => {
                response.data.map((category_info) => {
                    if(blog.categories.includes(category_info.id)){
                        setCurrentCat(prevValue => [...prevValue, category_info.name]);
                    }
                })
                setIsLoaded(true);
            })
        }
    },[])

    const DisplayCategories = () => {
        if(blog.categories.length === 0) return null;
        let first_item = true;
        return(
            currentCat.map((cat) =>{
                if(first_item){
                    first_item = false;
                    return cat;
                }else{
                    return (
                        <span key={cat}>
                            , {cat}
                        </span>
                    )
                }
            })
        )
    }

    if(isLoaded){
        return (
            <Card sx={{ paddingTop:'2%', marginBottom:'6%', maxWidth:'60%' }}>

                <Typography variant='body2' sx={{ color:'#546263', fontFamily:'Montserrat Alternates', textAlign:'center' }}>
                    {DisplayCategories()}  
                </Typography>              

                <Typography variant='h4' sx={{ color:'#434743', fontFamily:'Montserrat Alternates', textAlign:'center', marginBottom:'2%', fontWeight:'600' }}>
                    {blog.title.rendered}
                </Typography>

                {blogImageURL ==="" ? null : <img alt="Blog Image" src={ blogImageURL } className='blog-image' /> }
                
                <Typography variant='body2' sx={{ color:'#546263', fontFamily:'Montserrat Alternates', textAlign:'center', fontStyle:'italic' }}>
                    {format(new Date(blog.date), 'MMM d, yyyy')}
                    <CircleIcon sx={{ height:'7px', marginBottom:'2px' }} />
                    by {authorName}
                </Typography>

                <CardContent>
                    <pre 
                        dangerouslySetInnerHTML={{ __html:blog.excerpt.rendered }} 
                        variant="body1" 
                        className='blog-description'
                    />
                </CardContent>
                <CardActions sx={{ justifyContent:'center', paddingBottom:'5%' }}>
                    <Button 
                        sx={{
                            color: '#f3f4ed',
                            backgroundColor: '#c06115',
                            fontFamily: 'Montserrat Alternates',
                            textTransform: "none",
                        }} 
                        disableElevation
                        variant={'contained'}
                        onClick={() => {navigate("/blog/"+blog.id)}}
                    >
                        Continue Reading
                    </Button>
                </CardActions>
                <Divider />
                <CardActions sx={{ justifyContent:'end', bgcolor:'#546263' }}>
                        <IconButton aria-label="share">
                            <FacebookIcon className="blog-share-icons" />
                        </IconButton>
                        <IconButton aria-label="share">
                            <TwitterIcon className="blog-share-icons" />
                        </IconButton>
                        <IconButton aria-label="share">
                            <PinterestIcon className="blog-share-icons" />
                        </IconButton>
                        <IconButton aria-label="share">
                            <LinkedInIcon className="blog-share-icons" />
                        </IconButton>
                </CardActions>
            </Card>
            
        )
    }else{
        return (
            <Card sx={{ padding:'3% 0px', marginBottom:'6%', width:'60%', minHeight:'50vh' }}>
                <Grid container>
                    <Grid item xs={12} sx={{ display:'flex', justifyContent:'center', marginBottom:'25px' }}>
                        <Box sx={{ width:'400px', height:'30px' }} className='skeleton' />
                    </Grid>
                    <Grid item xs={12} sx={{ display:'flex', justifyContent:'center', marginBottom:'25px' }}>
                        <Box sx={{ width:'650px', height:'350px' }} className='skeleton' />
                    </Grid>
                    <Grid item xs={12} sx={{ justifyContent:'center', padding:'0px 6%' }}>
                        <Box className='skeleton skeleton-text' />
                        <Box className='skeleton skeleton-text' />
                        <Box className='skeleton skeleton-text' />
                        <Box className='skeleton skeleton-text' />
                        <Box className='skeleton skeleton-text' />
                    </Grid>
                </Grid>
            </Card>
        );
    }
    
}
