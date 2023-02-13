import React, { createContext, useEffect, useState } from "react";
const Context = createContext()


function AuthProvider({ children }) {

    const [authenticated, setAuthenticated] = useState(false)
    const [countUsersDeleted, setCountUsersDeleted] = useState(JSON.parse(localStorage.getItem("countUsersDeleted")) || 0);

    useEffect(() => {
        localStorage.setItem("countUsersDeleted", JSON.stringify(countUsersDeleted));
    }, [countUsersDeleted]);

    return (

        <>

            <Context.Provider
                value={{
                    authenticated,
                    setAuthenticated,
                    countUsersDeleted,
                    setCountUsersDeleted
                }}>
                {children}
            </Context.Provider>
        </>
    )
}

export { Context, AuthProvider }