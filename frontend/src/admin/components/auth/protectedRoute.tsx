import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/admin/login" />;
    return children;
};