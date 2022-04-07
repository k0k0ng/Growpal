import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';

import TopNavComponent from '../../components/TopNavComponent';
import FooterComponent from '../../components/FooterComponent';
import BlogItemComponent from '../../components/BlogItemComponent';

import { 
    Box, 
    Card,
    Typography, 
    Grid
} from '@mui/material';
import ContactUsComponent from '../../components/ContactUsComponent';

export default function BlogPage() {
    const [blogs, setBlogs] = useState(() => { return []; });
    const [isLoaded, setIsLoaded] = useState(() => { return false; });

    useEffect(() => {
        window[`scrollTo`]({ top:'0', behavior: `smooth` });

        axios.get('http://localhost:8000/wp-json/wp/v2/posts')
        .then((result) => {
            setBlogs(result.data);
            setIsLoaded(true);
        }).catch(err => {
            console.log("============ Error =============")
            console.log(err.response);
            console.log("================================")
        });
    },[]);

    useEffect(() => {
        console.log(blogs);
    },[blogs]);


    let [pageNumber, setPageNumber] = useState(() => { return 0; });
    let [blogsPerPage, setBlogsPerPage] = useState(() => { return 5; });
    const pagesVisited = pageNumber * blogsPerPage;
    const pageCount = Math.ceil(blogs.length / blogsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const DisplayBlogs = () => {
        if(isLoaded){
            return (
                blogs.slice(pagesVisited, pagesVisited + blogsPerPage).map((blog) => (
                    <BlogItemComponent key={blog.id} blog={blog} />
                ))
            );
        }else{
            return(
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
            )
        }
        
    }

    

    return (
        <Box>
            <TopNavComponent />
            
            <Box className='blogs-container'>
                <Typography 
                    variant='h3' 
                    sx={{ 
                        textAlign:'center',
                        marginBottom:'2%',
                        color:'#c06115',
                        fontFamily:'Montserrat Alternates'
                    }}
                >
                    Blogs
                </Typography>
                
                <Grid container sx={{ justifyContent:'center', padding:'2% 5% 0% 5%', minHeight:'70vh' }}>
                    { DisplayBlogs() }
                </Grid>
                <Grid container sx={{ justifyContent:'center', padding:'0% 5% 5% 5%' }}>
                    <Grid item xs={12} maxHeight="100px" sx={{ display:'flex', justifyContent:'center', paddingRight:'3.2%' }}>
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"pagination-buttons"}
                            nextLinkClassName={"pagination-next-button"}
                            previousLinkClassName={"pagination-previous-button"}
                            disabledClassName={"pagination-disabled"}
                            activeClassName={"pagination-active"}
                        />
                    </Grid>
                </Grid>
            </Box>

            <ContactUsComponent />
        
            <FooterComponent />
        </Box>
    );
}
