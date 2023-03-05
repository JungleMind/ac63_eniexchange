import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/Login" replace />
  }
  // else{
  //   return <Navigate to="/Accueil" replace />
  // }
  return children
}
export default Protected