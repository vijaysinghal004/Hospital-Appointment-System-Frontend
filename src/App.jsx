import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import ForgetPassword from './pages/ForgetPassword'
import Home from './pages/Home'
import AddDoctor from './pages/AddDoctor'
import EditDoctor from './pages/EditDoctor' 
import useGetCurrentUser from './hooks/UseGetCurrentUser'
import useGetDoctors from './hooks/useGetDoctors'
import MyAppointments from './components/MyAppointments '
import useGetAppointments from './hooks/UseGetAppointments'

export const serverUrl = 'http://localhost:8080';

const App = () => {

  useGetCurrentUser();
  useGetDoctors();
  useGetAppointments();

  const { userData } = useSelector(state => state.user);

  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path='/signup'
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path='/signin'
        element={!userData ? <Signin /> : <Navigate to="/" />}
      />

      <Route
        path='/forget-password'
        element={!userData ? <ForgetPassword /> : <Navigate to="/" />}
      />

      {/* Home - Logged In Users */}
      <Route
        path='/'
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />

      <Route
        path='/my-appointments'
        element={userData  && userData.role === "user" ? <MyAppointments /> : <Navigate to="/signin" />}
      />

      <Route
        path='/add-doctor'
        element={
          userData && userData.role === "owner"
            ? <AddDoctor />
            : <Navigate to="/" />
        }
      />

      <Route
        path='/edit-doctor/:docId'
        element={
          userData && userData.role === "owner"
            ? <EditDoctor />
            : <Navigate to="/" />
        }
      />
    </Routes>
  )
}

export default App