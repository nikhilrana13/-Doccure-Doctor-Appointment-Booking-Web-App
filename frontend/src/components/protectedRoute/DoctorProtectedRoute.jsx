import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const DoctorProtectedRoute = () => {
    const user = useSelector((state)=>state.Auth.user)

  return user?.role === "doctor" ? <Outlet /> : <Navigate to="/" />;
}

export default DoctorProtectedRoute;
