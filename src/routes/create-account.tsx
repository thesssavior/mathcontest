import { FirebaseError } from "firebase/app"
import { Logo, Title, Wrapper, Form, Error, Input, Switcher } from "../components/auth-components"
import React, { useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"

export default function CreateAccount() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
        setError('')
        e.preventDefault()
        if (isLoading || name === '' || email === ''|| password === '' ) {
            return null
        }
        try {
            setIsLoading(true)
            const credentials = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(credentials.user, {
                displayName: name
            })
            navigate('/')
        } catch(e) {
            if (e instanceof FirebaseError) {
                setError(e.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    // update states accordingly
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        // destructuring, same as
        // const name = e.target.name;
        // const value = e.target.value;
        const {target: {name, value}} = e
        if ( name === 'name') {
            setName(value)
        } else if ( name === 'email') {
            setEmail(value)
        } else if ( name === 'password') {
            setPassword(value)
        }
    }

    return (
        <Wrapper>
            <Logo/>
            <Title>Sign up</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="name" placeholder="Name" type="name" value={name} required/>
                <Input onChange={onChange} name="email" placeholder="Email" type="email" value={email} required/>
                <Input onChange={onChange} name="password" placeholder="Password" type="password" value={password} required/>
                <Input type="submit" value={ isLoading ? "loading..." : "create account"}/>
            </Form>
            {error !== '' ? <Error>{error}</Error>: null}
            <Switcher>
                Already have an account? &nbsp;
                <Link to={'/login'}>Log in</Link>
            </Switcher>
        </Wrapper>
    )
}