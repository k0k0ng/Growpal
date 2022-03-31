import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    const navigate = useNavigate()

    let [accessToken, setAccessToken] = useState(() => localStorage.getItem('AccessToken') ? JSON.parse(localStorage.getItem('AccessToken')) : null)
    let [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('RefreshToken') ? JSON.parse(localStorage.getItem('RefreshToken')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('AccessToken') ? jwt_decode(localStorage.getItem('AccessToken')) : null)
    let [userBookmark, setUserBookmark] = useState(() => { return []; })
    let [loading, setLoading] = useState(() => { return true; })


    let logoutUser = () => {
        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
        setUserBookmark(null)
        localStorage.removeItem('AccessToken')
        localStorage.removeItem('RefreshToken')
        navigate('/login')
    }

    let updateToken = async ()=> {
        
        let response = null
        let data = null
        if(accessToken){
            response = await fetch('/api/token/refresh/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'refresh':refreshToken ? refreshToken : ''})
            })

            data = await response.json()
        }

        if (response !== null){
            if(response.status === 200){
                setAccessToken(data.access)
                setUser(jwt_decode(data.access))
                localStorage.setItem('AccessToken', JSON.stringify(data.access))
            }
            
        }else{
            logoutUser()
        }

        if(loading) setLoading(false);
        
    }

    useEffect(()=> {

        if(loading) updateToken();
        
        let fourMinutes = 1000 * 60 * 4

        let interval = setInterval(()=> {
            if(accessToken) updateToken()
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [accessToken, refreshToken ,loading])



    const GetUserBookmarkedTools = async () => {
        let response = await fetch('/api/get-user-bookmarked-tools',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: user.email
            })
        })

        if(response.status === 204) {
            setUserBookmark([]);
            return;
        }
        
        let data = await response.json();
        
        if(response.status === 200){
            setUserBookmark(data);
        }else{
            alert('Bookmark is empty!');
            setUserBookmark([]);
        }
    }
    

    useEffect(()=> {
        if(!user) return;

        GetUserBookmarkedTools()        
    }, [user])




    let contextData = {
        user:user,
        userBookmark: userBookmark,
        accessToken: accessToken,
        setUser:setUser,
        setAccessToken:setAccessToken,
        setRefreshToken:setRefreshToken,
        setUserBookmark: setUserBookmark
    }

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}