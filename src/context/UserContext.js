import React, { useState } from "react";


const UserConText = React.createContext({ name: '', auth: false })
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

    return (
        <UserConText.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserConText.Provider>
    );
}
export {UserConText, UserProvider}