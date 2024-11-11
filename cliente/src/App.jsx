import React, { Profiler } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'
import { TaksPage } from './pages/TaksPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProtectedRoutes } from './ProtectedRoutes'

const App = () => {
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>


      <Route element={<ProtectedRoutes/>}>
          <Route path='/taks' element={<TaksPage/>}/>
          <Route path='/add-task' element={<TaskFormPage/>}/>
          <Route path='/taks/:id' element={<TaskFormPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
      </Route>
        </Routes>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App
