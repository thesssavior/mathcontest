import { FirebaseError } from "firebase/app"
import { Logo, Title, Wrapper, Form, Error, Input, Switcher } from "../components/auth-components"
import React, { useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"

export default function CreateAccount() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
        setError('')
        e.preventDefault()
        if (isLoading || email === ''|| password === '' ) {
            return null
        }
        try {
            setIsLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            console.log(auth.currentUser?.displayName)
            navigate('/')
    
        } catch(e) {
            if (e instanceof FirebaseError) {
                setError(e.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e
        if ( name === 'email') {
            setEmail(value)
        } else if ( name === 'password') {
            setPassword(value)
        }
    }

    return (
        <Wrapper>
            <Logo/>
            <Title>Log in</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" placeholder="Email" type="email" value={email} required/>
                <Input onChange={onChange} name="password" placeholder="Password" type="password" value={password} required/>
                <Input type="submit" value={ isLoading ? "loading..." : "Log in"}/>
            </Form>
            {error !== '' ? <Error>{error}</Error>: null}
            <Switcher>
                Don't have an account? &nbsp;
                <Link to={'/create-account'}>Sign up</Link>
            </Switcher>
        </Wrapper>
    )
}