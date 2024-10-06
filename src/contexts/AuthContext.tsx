import { createContext } from "react";

interface myContextType{
    role : string,
    setRole : React.Dispatch<React.SetStateAction<string>>
}

const initialState = {
    role: "",
    setRole : ()=> {}
}
const AuthContext = createContext<myContextType>(initialState);

export default AuthContext