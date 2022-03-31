import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // let [accessToken, setAccessToken] = useState(() => localStorage.getItem('AccessToken') ? JSON.parse(localStorage.getItem('AccessToken')) : null)
    // let [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('RefreshToken') ? JSON.parse(localStorage.getItem('RefreshToken')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('AccessToken') ? jwt_decode(localStorage.getItem('AccessToken')) : null)
    let [userBookmark, setUserBookmark] = useState(() => { return []; })
    let [loading, setLoading] = useState(() => { return true; })


    let logoutUser = () => {
        setUser(null)
        // setAccessToken(null)
        // setRefreshToken(null)
        setAuthTokens(null)
        setUserBookmark(null)
        // localStorage.removeItem('AccessToken')
        // localStorage.removeItem('RefreshToken')
        localStorage.removeItem('authTokens')
    }

    let updateToken = async ()=> {
        // let response = null
        // let data = null
        
        if(authTokens === null){
            setLoading(false);
            return
        }

        const response = await fetch('/api/token/refresh/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'refresh':authTokens?.refresh})
            })

        if (response !== null){
            const data = await response.json()

            if(response.status === 200){
                setAuthTokens(data)
                // setAccessToken(data.access)
                // setRefreshToken(data.refresh)
                setUser(jwt_decode(data.access))
                // localStorage.setItem('AccessToken', JSON.stringify(data.access))
                // localStorage.setItem('RefreshToken', JSON.stringify(data.refresh))
                localStorage.setItem('authTokens', JSON.stringify(data))
            }
            
        }else{
            logoutUser();
        }

        if(loading) setLoading(false);
        
    }

    useEffect(()=> {

        if(loading) updateToken();
        
        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens ,loading])



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
        // accessToken: accessToken,
        authTokens:authTokens,
        setUser:setUser,
        // setAccessToken:setAccessToken,
        // setRefreshToken:setRefreshToken,
        setAuthTokens:setAuthTokens,
        setUserBookmark: setUserBookmark
    }

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}