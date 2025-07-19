import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';

const VideocallProtectedRoute = ({children}) => {
    const user = useSelector((state)=>state.Auth.user)
    if(!user){
        return <Navigate to="/" replace />
    }
  return children
}

export default VideocallProtectedRoute;
