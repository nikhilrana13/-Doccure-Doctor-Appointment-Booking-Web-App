import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PatientProtectedRoute = () => {
    const user = useSelector((state)=>state.Auth.user);
  

  return user?.role === "patient" ? <Outlet /> : <Navigate to="/" />;
}

export default PatientProtectedRoute
