import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'
import axios from 'axios';

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';

import { 
    Box, 
    Typography, 
    Card,
    CardContent,
    CardActions,
    Divider,
    IconButton
} from '@mui/material';

import CircleIcon from '@mui/icons-material/Circle';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';

export default function BlogInfoPage() {
    const { blogID } = useParams();

    const [blogInfo, setBlogInfo] = useState(() => {return [];});
    const [blogFeaturedImageURL, setBlogFeaturedImageURL] = useState(() => {return "";});
    const [authorName, setAuthorName] = useState(() => {return "";});
    const [isLoaded, setIsLoaded] = useState(() => {return false;});

    useEffect(() => {
        axios.get(`http://localhost:8000/wp-json/wp/v2/posts/${blogID}`)
        .then((result) => {
            setBlogInfo(result.data);
            console.log("============ ResultData =============")
            console.log(result.data.author)

            const getBlogFeaturedImage = axios.get(`http://localhost:8000/wp-json/wp/v2/media/${result.data.featured_media}`);
            const getBlogAuthorName = axios.get(`http://localhost:8000/wp-json/wp/v2/users/${result.data.author}`);

            Promise.all([getBlogFeaturedImage, getBlogAuthorName]).then(response => {
                setBlogFeaturedImageURL(response[0].data.media_details.sizes.full.source_url);
                setAuthorName(response[1].data.name);
            }).then(() =>{
                setIsLoaded(true);
            })
        }).catch(err => {
            console.log("============ Error =============")
            console.log(err);
            console.log("================================")
        });
    },[]);

    useEffect(() => {
        console.log("============ BlogInfo =============")
        console.log(blogInfo);
    },[blogInfo]);

    if(isLoaded) {
        return (
            <Box>
                <TopNavComponent />
                
                <Box sx={{ paddingTop:'100px', minHeight:'95vh', justifyContent:'center', display:'flex' }}>
                    <Card sx={{ paddingTop:'1%', marginBottom:'6%', maxWidth:'60%' }}>
                        
                        <Typography variant='h4' sx={{ color:'#434743', fontFamily:'Montserrat Alternates', textAlign:'center', margin:'2% 0px' }}>
                            {blogInfo.title.rendered}
                        </Typography>
                        {blogFeaturedImageURL ==="" ? null : <img alt="Blog Image" src={ blogFeaturedImageURL } className='blog-image' /> }
                        
                        <Typography variant='body2' sx={{ color:'#546263', fontFamily:'Montserrat Alternates', textAlign:'center', fontStyle:'italic' }}>
                            {format(new Date(blogInfo.date), 'MMM d, yyyy')}
                            <CircleIcon sx={{ height:'7px', marginBottom:'2px' }} />
                            by {authorName}
                        </Typography>
    
                        <CardContent sx={{ margin:'0px 10%' }}>
                            <pre 
                                dangerouslySetInnerHTML={{ __html:blogInfo.content.rendered }} 
                                variant="body1" 
                                className='blog-description'
                            />
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent:'end' }}>
                                <IconButton aria-label="share">
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <PinterestIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <LinkedInIcon />
                                </IconButton>
                        </CardActions>
                    </Card>
                </Box>
            
                <FooterComponent />
            </Box>
        )
    }else{
        return(
            <Box>
                <TopNavComponent />
                
                <Box sx={{ paddingTop:'50px', minHeight:'90.9vh',  display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <HourglassBottomRoundedIcon className='loading-icon' />
                </Box>
            
                <FooterComponent />
            </Box>
        )
    }

    
}
