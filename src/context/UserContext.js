import React, { useState, useEffect } from "react";
import {getUserAccount} from '../service/userService'

const UserConText = React.createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ 
        isAuthenticated: false, 
        token: "" ,
        account: {}
    });

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser(userData) 
    }
    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };
    const fetchUser = async() => {
        let response = await getUserAccount()
        if(response && response.EC === 0){
            let groupWithRoles = response.DT.groupWithRoles
            let email = response.DT.email
            let username = response.DT.username
            let token = response.DT.access_token

            let data = {
                isAuthenticated : true,
                token,
                account:{groupWithRoles, email, username}
            }
            setUser(data)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <UserConText.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserConText.Provider>
    );
}
export {UserConText, UserProvider}