import React, { createContext, useState } from "react";
const Context = createContext()


function AuthProvider({ children }) {

    const [authenticated, setAuthenticated] = useState(false)

    return (
        <Context.Provider
            value={{
                authenticated,
                setAuthenticated,
            }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }