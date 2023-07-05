import React from "react"
import { AppShell, Button, Text, Header, Group, Grid } from '@mantine/core';
import { useAuth } from "../../contexts/AuthContext"
import { Navigate, Outlet, Link} from "react-router-dom"
import Sidebar from "../commons/Sidebar";
export default function AuthLayout() {
  const { currentUser, logout } = useAuth()

  return currentUser !== null ? (
    <AppShell
      
    >
         <Grid>
          <Grid.Col span={1}><Sidebar /></Grid.Col>
          <Grid.Col span={10}>
            <Outlet />
          </Grid.Col>
    
        </Grid>
      
    </AppShell>

  ) : (
    <Navigate to={"/login"} replace />
  );
}
