import { Navigate } from "react-router-dom";
// import { useDispatch } from 'react-redux'
// import { setIsLogin } from '../store/actions'

function ProtectedRoute({ children }) {
    // const dispatch = useDispatch()
    
    const access_token = localStorage.getItem('access_token')
    if (!access_token) {
        return <Navigate to='/login'></Navigate>;
    } else {
        return children
    }
}

function ProtectedRouteLogin({ children }) {
    const access_token = localStorage.getItem('access_token')

    if (access_token) {
        return <Navigate to='/'></Navigate>;
    } else {
        return children
    }
}

const ProtectRoute = { ProtectedRoute, ProtectedRouteLogin }
export default ProtectRoute