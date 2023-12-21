import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login'
import ForgotPassword from './routes/forgot-password'
import CreateAccount from './routes/create-account'
import Home from './routes/home'
import Profile from './routes/profile'
import Layout from './components/layout'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { auth } from './firebase'
import ProtectedRoute from './components/protected-route'
import List from './routes/list'
import Problem from './routes/problem'

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
`

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "profile",
        element: <Profile/>
      },
      {
        path: "list/:folderName",
        element: <List/>
      },
      {
        path: "problem/:folderName/:number",
        element: <Problem/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/create-account",
    element: <CreateAccount/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>,
  }
])

const GlobalStyle = createGlobalStyle`
  ${reset}; 
  * {
    box-sizing: border-box;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const init = async () => {
    await auth.authStateReady()
    setIsLoading(false)
  }

  useEffect(()=>{
    init()
  },[])

  return (
    <Wrapper>
      <GlobalStyle/>
      <RouterProvider router={router}/>
    </Wrapper>
  )
}

export default App
