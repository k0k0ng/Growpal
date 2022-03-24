import React from 'react';
import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [userBookmark, setUserBookmark] = useState(() => { return []; })
    let [loading, setLoading] = useState(() => { return true; })
    

    const navigate = useNavigate()

    let logoutUser = () => {
        setUser(null)
        setAuthTokens(null)
        setUserBookmark(null)
        localStorage.removeItem('authTokens')
        // navigate('/login')
    }

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

    
    


    let updateToken = async ()=> {
        let response = null
        let data = null
        if(authTokens){
            response = await fetch('/api/token/refresh/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'refresh':authTokens?.refresh})
            })

            data = await response.json()
        }

        

        
        //console.log(response.status)
        // console.log(data)
        if (response !== null){
            if(response.status === 200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            }
            
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        userBookmark: userBookmark,
        setUser:setUser,
        setAuthTokens:setAuthTokens,
        setUserBookmark: setUserBookmark
    }


    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}