import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('AccessToken') ? jwt_decode(localStorage.getItem('AccessToken')) : null)
    let [UserAccountName, setUserAccountName] = useState(() => { user ? user.name : "" });
    let [UserAccountImage, setUserAccountImage] = useState(() => { user ? user.display_image : "" });
    let [userBookmark, setUserBookmark] = useState(() => { return []; })
    let [loading, setLoading] = useState(() => { return true; })
    let [resetUser, setResetUser] = useState(() => { return false; })
    

    let logoutUser = () => {
        setUser(null)
        setAuthTokens(null)
        setUserBookmark(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async ()=> {

        if(authTokens === null){
            setLoading(false);
            return
        }

        const response = await fetch('/api/token/refresh/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'refresh':authTokens.refresh})
            })

        if (response !== null){
            const data = await response.json()
            if(response.status === 200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            }else{
                logoutUser();
            }
            
        }else{
            logoutUser();
        }

        if(loading) setLoading(false);
        
    }


    const ResetUserInformation = () => {

        fetch('/api/get-account-name-image', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: user.email
            })
        }).then((response) => response.json()
        ).then((data) => {
            setUserAccountName(data.name);
            setUserAccountImage(data.display_image);
        }).catch(err => {
            console.log("Something went wrong getting updated user info.")
            console.log(err);
        });
        
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

        GetUserBookmarkedTools();
        ResetUserInformation();
    }, [user])


    useEffect(()=> {
        if(!user) return;

        ResetUserInformation();     
    }, [resetUser])


    let contextData = {
        user:user,
        UserAccountName: UserAccountName,
        UserAccountImage: UserAccountImage,
        userBookmark: userBookmark,
        authTokens:authTokens,
        setUser:setUser,
        resetUser:resetUser,
        setAuthTokens:setAuthTokens,
        setUserBookmark: setUserBookmark,
        setResetUser:setResetUser
    }

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}



