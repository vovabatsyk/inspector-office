import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { routes } from './routes'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NavBar } from './components/Navbar'

function App() {
  const navigate = useNavigate()
  const localToken = localStorage.getItem('token')

  useEffect(() => {
    if (localToken) {
      console.log('localToken', localToken)

      navigate('../')
    }
  }, [localToken])
  return (
    <Layout>
      <Layout.Content>
        {localToken && <NavBar />}
        <Routes>
          {localToken ? (
            <>
              <Route path={routes.HOME_PAGE} element={<HomePage />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </>
          ) : (
            <>
              <Route path={routes.LOGIN_PAGE} element={<LoginPage />} />
              <Route path='*' element={<Navigate to={routes.LOGIN_PAGE} replace />} />
            </>
          )}
        </Routes>
      </Layout.Content>
    </Layout>
  )
}

export default App
