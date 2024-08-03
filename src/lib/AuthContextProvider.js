"use client"
import { createContext, ReactNode, useContext, useState } from "react";


const AuthContext = createContext();


export const AuthProvider=({ children }) =>{
    console.log("inside authProvider function Function")
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    function login() {
        console.log("inside login Function")
    
        setIsAuthenticated(true)
       
        }
    const logout =()=>setIsAuthenticated(false)
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)