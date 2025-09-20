import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from './components/RouteGuards'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Register from './pages/Register'
import SignIn from './pages/SignIn'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signin'
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
