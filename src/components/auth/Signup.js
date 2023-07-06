import React, { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, Navigate, useNavigate } from "react-router-dom"
import CenteredContainer from "../commons/CenteredContainer"
import { db } from "../../firebase";
import { Alert, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm, matchesField } from '@mantine/form';

export default function Signup() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });


  async function handleSubmit(e) {
    e.preventDefault()
    form.validate();
    console.log(form.values)

    try {
      setError("")
      setLoading(true)
      const data = {
        email: form.values.email
      }
      const result = await signup(form.values.email, form.values.password)
      db.users.doc(result.user.uid).set(data)
      navigate("/")
    } catch(e) {
      console.log(e)
      setError(String(e))
    }

    setLoading(false)
  }

  return (
    currentUser === null ? (
      <CenteredContainer>
        <Card>
          <Card.Body>
            <Title  align="center">
              Sign Up
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
               <PasswordInput 
                mt='sm'
                placeholder="Confirm Password"
                label="Password Confirmation"
                withAsterisk
                {...form.getInputProps('confirmPassword')}
               />
               <Button disabled={loading} mt="lg"  type="submit">Submit</Button>
            </form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </CenteredContainer>
    ) : <Navigate to={"/"} replace />
  )
}
