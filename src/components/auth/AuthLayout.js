import React from "react"
import { AppShell, Button, Text, Header, Group } from '@mantine/core';
import { useAuth } from "../../contexts/AuthContext"
import { Navigate, Outlet, Link} from "react-router-dom"

export default function AuthLayout() {
  const { currentUser, logout } = useAuth()

  return currentUser !== null ? (
    <AppShell
      padding="md"
      header={<Header height={60} p="xs">
        <Group position="apart">
          <Text>
            Signed in as: {currentUser.email}
          </Text>
          <Button onClick={logout} color="red">
            Logout
          </Button>
        </Group>
      </Header>}
    >
      <Outlet />
    </AppShell>

  ) : (
    <Navigate to={"/login"} replace />
  );
}
