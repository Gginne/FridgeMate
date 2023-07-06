import React from "react"
import { AppShell, Grid } from '@mantine/core';
import { useAuth } from "../../contexts/AuthContext"
import { Navigate, Outlet} from "react-router-dom"
import Sidebar from "../commons/Sidebar";
export default function AuthLayout() {
  const { currentUser } = useAuth()

  return currentUser !== null ? (
    <AppShell
      navbar={<Sidebar />}
    >
         <Grid>
          <Grid.Col span={1}></Grid.Col>
          <Grid.Col span={10}>
            <Outlet />
          </Grid.Col>
    
        </Grid>
      
    </AppShell>

  ) : (
    <Navigate to={"/login"} replace />
  );
}
