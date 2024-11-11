import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"


export const ProtectedRoutes = () => {
    const {loanding, isAuthenticathed } = useAuth()
    if(loanding) return <h1>Loading....</h1>
    if(!loanding && !isAuthenticathed) return <Navigate to='/login' replace/>
  return (
    <div>
        <Outlet/>
    </div>
  )
}
