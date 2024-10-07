import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

interface Props {
    children: React.ReactNode;
}

const AuthContextProvider = (props: Props) => {
    const [role, setRole] = useState<string>(() => {
        const storedRole = localStorage.getItem("role");
        return storedRole ? storedRole : "";
    });

    useEffect(() => {
        if (role) {
            localStorage.setItem("role", role);
        } else {
            localStorage.removeItem("role");
        }
    }, [role]);

    return (
        <AuthContext.Provider value={{ role, setRole }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
