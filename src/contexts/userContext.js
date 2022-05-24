import React from 'react'
import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from '../services/auth';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    const { user, setUser } = context;
    return { user, setUser };
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user) {
            setUser(getUser())
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}