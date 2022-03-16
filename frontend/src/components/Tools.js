import React, { useState, useEffect } from 'react';
import TopNavComponent from './TopNavComponent';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import { useParams, useNavigate } from 'react-router-dom';



export default function Tools(){

    const navigate = useNavigate(); 
    
    // const [title, setTitle] = useState(() => {
    //     return "Sample Title";
    // });
    // const [description, setDescription] = useState(() => {
    //     return "Sample";
    // });
    // const [img, setImg] = useState(() => {
    //     return "Sample";
    // });
    // const [url, setUrl] = useState(() => {
    //     return "sample.com";
    // });
    const [editMode, setEditMode] = useState(() => {
        return false;
    });

    const [state, setState] = useState({
        id: 0,
        title: "Sample Title",
        description: "Sample descruotion",
        img: "Sample image source",
        url: "Sample url"
    });

    const id = state.id
    const title = state.title
    const description = state.description
    const img = state.img
    const url = state.url
    
    const { toolID } = useParams();

    
    if(toolID){
        console.log("Not epty");
    }else{
        console.log("empty");
    }

    useEffect(() => {
        setEditMode(prevValue => prevValue = false)
        getToolDetails(toolID);

        // return () =>{
        //     console.log("Displays when unmount.");
        // };
    },[toolID]);
    
    useEffect(() => {
        getToolDetails(toolID);
    },[editMode]);

    function getToolDetails(ID){
        fetch('/api/get-tool'+'?toolID='+ID).then((response) => response.json()).then((data) => {
            // setTitle( prevValue => prevValue = data.title);
            // setDescription( prevValue => prevValue = data.description);
            // setImg( prevValue => prevValue = data.img_src);
            // setUrl( prevValue => prevValue = data.url);
            console.log(data);
            setState(prevState =>{
                return {
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    img: data.img_src,
                    url: data.url
                }
            })
        });
    }



    function _setTitle(e){
        //setTitle( prevValue => prevValue = e.target.value);
        setState(prevState => {
            return {
               ...prevState,
               title: e.target.value 
            }
        })
    }

    function _setDescription(e){
        //setDescription( prevValue => prevValue = e.target.value);
        setState(prevState => {
            return {
               ...prevState,
               description: e.target.value 
            }
        })
    }

    function _setImg(e){
        //setImg( prevValue => prevValue = e.target.value);
        setState(prevState => {
            return {
               ...prevState,
               img: e.target.value 
            }
        })
    }

    function _setURL(e){
        //setUrl( prevValue => prevValue = e.target.value);
        setState(prevState => {
            return {
               ...prevState,
               url: e.target.value 
            }
        })
    }

    function _toEditMode(){
        setEditMode( prevValue => prevValue = true);
    }

    function _toViewMode(){
        setEditMode( prevValue => prevValue = false);
    }

    function _saveEditTool(){
        console.log("ID: "+id);
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                title: title,
                description: description,
                img_src: img,
                url: url
            }),
        };
        fetch('/api/update-tool', requestOptions)
        .then((response) => {
            if (response.ok){
                console.log("Sucess update.");
            }else{
                console.log("Failed update.");
            }
        });
    }

    function _viewMode(){
        return (
        <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant='h4' align='center'>Tool Info</Typography></Grid>
            <Grid item xs={12} align='center'><Typography variant='body2'>Title: {title}</Typography></Grid>
            <Grid item xs={12} align='center'><Typography variant='body2'>Description: {description}</Typography></Grid>
            <Grid item xs={12} align='center'><Typography variant='body2'>Image Source: {img}</Typography></Grid>
            <Grid item xs={12} align='center'><Button color='primary' href={"https://"+url}>{url}</Button></Grid>
            <Grid item xs={12} align='center'><Button color='default' size='small' variant='contained' onClick={_toEditMode}>Edit Tool</Button></Grid>
        </Grid>
        );
    }

    function _editMode(){
        return (
        <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant='h4' align='center'>Edit Tool Info</Typography></Grid>
            <Grid item xs={12} align='center'><TextField label="Title" defaultValue={title} variant="outlined" onChange={_setTitle}/></Grid>
            <Grid item xs={12} align='center'><TextField label="Description" defaultValue={description} variant="outlined" onChange={_setDescription} /></Grid>
            <Grid item xs={12} align='center'><TextField label="Image" defaultValue={img} variant="outlined" onChange={_setImg} /></Grid>
            <Grid item xs={12} align='center'><TextField label="Link" defaultValue={url} variant="outlined" onChange={_setURL} /></Grid>
            <Grid item xs={12} align='center'><Button color='primary' variant='contained' onClick={_saveEditTool}>Save</Button></Grid>
            <Grid item xs={12} align='center'><Button color='default' size='small' variant='contained' onClick={_toViewMode}>Cancel</Button></Grid>
        </Grid>
        );
    }

    

    return (
        <div id="toolsDiv">
            <TopNavComponent />
            { editMode ? _editMode() : _viewMode() }
        </div>
    )
}

