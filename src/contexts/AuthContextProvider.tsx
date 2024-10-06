import React, { useState } from "react";
import AuthContext from "./AuthContext";

interface Props {
    children: React.ReactNode;
}

const AuthContextProvider = (props : Props)=>{
    const [role,setRole] = useState<string>("")
    return (
        <AuthContext.Provider value={{role,setRole}}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContextProvider