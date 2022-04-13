import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'
import axios from 'axios';
import {
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TwitterShareButton
  } from "react-share";

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';

import { 
    Box, 
    Typography, 
    Card,
    CardContent,
    CardActions,
    Divider,
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
    const [currentCat, setCurrentCat] = useState(() => {return [];});

    useEffect(() => {
        axios.get(`http://localhost:8000/wp-json/wp/v2/posts/${blogID}`)
        .then((result) => {
            setBlogInfo(result.data);

            axios.get(`http://localhost:8000/wp-json/wp/v2/users/${result.data.author}`).then(response => {
                setAuthorName(response.data.name);
            });

            if(result.data.featured_media === 0) {
                setIsLoaded(true);
                return null;
            }
            
            axios.get(`http://localhost:8000/wp-json/wp/v2/media/${result.data.featured_media}`).then(response => {
                setBlogFeaturedImageURL(response.data.media_details.sizes.full.source_url);
                setIsLoaded(true);
            });

            if(result.data.categories.length > 0){
                axios.get(`http://localhost:8000/wp-json/wp/v2/categories`)
                .then(response => {
                    response.data.map((category_info) => {
                        if(result.data.categories.includes(category_info.id)){
                            setCurrentCat(prevValue => [...prevValue, category_info.name]);
                        }
                    })
                    setIsLoaded(true);
                })
            }
            
        }).catch(err => {
            console.log("============ Error =============")
            console.log(err);
            console.log("================================")
        });
    },[]);

    const DisplayCategories = () => {
        if(currentCat.length === 0) return null;
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

    const DisplayPinterestButton = () => {
        if(blogFeaturedImageURL === "") return null;

        return(
            <PinterestShareButton 
                media={blogFeaturedImageURL} 
                url={blogInfo.link}
                quote={blogInfo.title.rendered}
                hashtag={'#wordpress_blog'}
            >
                <PinterestIcon className="blog-share-icons" />
            </PinterestShareButton>
        );
    }

    if(isLoaded) {
        return (
            <Box>
                <TopNavComponent />
                
                <Box sx={{ paddingTop:'100px', minHeight:'95vh', justifyContent:'center', display:'flex' }}>
                    <Card className="blog-card-container">
                        
                        <Typography variant='body2' sx={{ color:'#546263', fontFamily:'Montserrat Alternates', textAlign:'center' }}>
                            {DisplayCategories()}  
                        </Typography> 
                        
                        <Typography variant='h4' sx={{ color:'#434743', fontFamily:'Montserrat Alternates', textAlign:'center', margin:'1% 0px 2% 0px' }}>
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
                        <CardActions sx={{ justifyContent:'end', bgcolor:'#546263' }}>
                            <FacebookShareButton 
                                url={blogInfo.link}
                                quote={blogInfo.title.rendered}
                                hashtag={'#wordpress_blog'}
                            >
                                <FacebookIcon className="blog-share-icons" />
                            </FacebookShareButton>
                            <TwitterShareButton 
                                url={blogInfo.link}
                                quote={blogInfo.title.rendered}
                                hashtag={'#wordpress_blog'}
                            >
                                <TwitterIcon className="blog-share-icons" />
                            </TwitterShareButton>
                            
                            {DisplayPinterestButton()}

                            <LinkedinShareButton 
                                url={blogInfo.link}
                                quote={blogInfo.title.rendered}
                                hashtag={'#wordpress_blog'}
                            >
                                <LinkedInIcon className="blog-share-icons" />
                            </LinkedinShareButton>
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
