import { createContext, useState, useContext, useEffect } from 'react';
import { loginRequeset, registerRequest, verifyTokenRequeset} from '../api/auth';
import Cookies from 'js-cookie'
import { set } from 'mongoose';

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
    const [loanding, setLoanding] = useState(true)


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
 
    const singin = async (user)=> {
            try {
                const response = await loginRequeset(user);
                console.log(response.data);
                setIsAuthenticated(true);
                setUser(response.data)
            } catch (error) {
                console.log(error)
                if(Array.isArray(error.response.data)){
                    setErrors(error.response.data)
                }
                setErrors([error.response.data.message]);
            }
    }

    useEffect(() => {
      if(errors.length > 0) {
        const timer = setTimeout(() => {
            setErrors([]);

        }, 5000)
      }
    
      return () => {
        clearTimeout(timer)
      }
    }, [errors])
    
    useEffect(()=> {
        const checkLogin = async ()=> {
            const cookies = Cookies.get();

        if(!cookies.token) {
            setIsAuthenticated(false)
            return setUser(null)
        }

        try {
            const response = await verifyTokenRequeset(cookies.token)

            if(!response.data) {
                setIsAuthenticated(false)
                setLoanding(false)
            }
            setIsAuthenticated(true)
            setUser(response.data)
            setLoanding(false)
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
            setLoanding(false)
        }
        }
        checkLogin();
    }, [])
    return (
        <AuthContext.Provider value={{
            singup,
            singin,
            user,
            isAuthenticathed,
            errors,
            loanding
        }}>{children}</AuthContext.Provider>
    )
}