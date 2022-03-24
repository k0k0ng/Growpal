import React from 'react';
import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    const navigate = useNavigate()

    let [accessToken, setAccessToken] = useState(() => localStorage.getItem('AccessToken') ? JSON.parse(localStorage.getItem('AccessToken')) : null)
    let [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('RefreshToken') ? JSON.parse(localStorage.getItem('RefreshToken')) : null)
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [userBookmark, setUserBookmark] = useState(() => { return []; })
    let [loading, setLoading] = useState(() => { return true; })


    let logoutUser = () => {
        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
        setAuthTokens(null)
        setUserBookmark(null)
        localStorage.removeItem('AccessToken')
        localStorage.removeItem('RefreshToken')
        localStorage.removeItem('authTokens')
        // navigate('/login')
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


    useEffect(()=> {
        if(!user) return;

        fetch('/api/get-user-bookmarked-tools',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: user.email
            })
        }).then((response) => response.json()).then((data) => {
            setUserBookmark(data.bookmarked_tool)
        });
        
    }, [user])

    let contextData = {
        user:user,
        authTokens:authTokens,
        userBookmark: userBookmark,
        setUser:setUser,
        setAccessToken:setAccessToken,
        setRefreshToken:setRefreshToken,
        setAuthTokens:setAuthTokens,
        setUserBookmark: setUserBookmark
    }

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}