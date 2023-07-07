import React from "react"
import { AppShell } from '@mantine/core';
import { useAuth } from "../../contexts/AuthContext"
import { Navigate, Outlet} from "react-router-dom"
import Sidebar from "../commons/Sidebar";
export default function AuthLayout() {
  const { currentUser } = useAuth()

  return currentUser !== null ? (
    <AppShell
      navbar={<Sidebar />}
    >
        
            <Outlet />
       
      
    </AppShell>

  ) : (
    <Navigate to={"/login"} replace />
  );
}
