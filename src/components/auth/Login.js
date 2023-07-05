import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link, Navigate, useNavigate} from "react-router-dom"
import CenteredContainer from "../commons/CenteredContainer"
import { useForm } from '@mantine/form';
import { Alert, Text, TextInput, Button, Card, PasswordInput, Title } from '@mantine/core';

export default function Login() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState("")

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  async function handleSubmit(e) {
    e.preventDefault()
    form.validate();

    try {
      await login(form.values.email, form.values.password)
      navigate("/")
    } catch(e) {
      console.log(e)
      setError("Failed to log in")
    }

  }


  return (
    currentUser === null ? (
      <CenteredContainer>
       <Card shadow="sm" withBorder>
          <Title
            align="center"
          >
            Log in
          </Title>
            {error && <Alert my='sm' color="red" variant="filled">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextInput 
                label="Email"
                placeholder="your@email.com"
                withAsterisk
                {...form.getInputProps('email')}
              />
               <PasswordInput 
                mt='sm'
                placeholder="Password"
                label="Password"
                withAsterisk
                {...form.getInputProps('password')}
               />
               <Button  mt="lg"  type="submit">Submit</Button>
            </form>
            </Card>
         <Text mt='sm'>
            Need an account? <Link to="/signup">Sign Up</Link>
          </Text>
      </CenteredContainer>
    ) :  <Navigate to={"/"} replace /> 
  )
}
