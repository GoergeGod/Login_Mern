import { createContext, useState, useContext } from 'react';
import { registerRequest } from '../api/auth';

export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("use Auth must be used within an AuthProvider");
    }
    return context;
}


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticathed, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState();


    const singup = async (user) => {
        try {
            const response = await registerRequest(user)
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data)
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            singup,
            user,
            isAuthenticathed,
            errors
        }}>{children}</AuthContext.Provider>
    )
}