import React, { createContext, useState } from "react";
import api from '../../api'
const Context = createContext()


function AuthProvider({ children }) {

    const [authenticated, setAuthenticated] = useState(false)
    const [idAdmin, setIdAdmin] = useState('')

    return (
        <Context.Provider value={{ authenticated, setAuthenticated, idAdmin, setIdAdmin }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }