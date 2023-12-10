import {createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    
    

    const login = async (username, password) => {
        
        
        try{
            const response = await axios.post("http://localhost:3000/login", {username, password});
            
            if(response.data){
                setIsLoggedIn(true);
                console.log(response.data.user);
                setUser(response.data.user);
                
            }
            else{
                alert("Invalid username or password");
            }
        }
        catch(error){
            console.error('Failed to login hehehe', error);
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
    }

    return(
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}