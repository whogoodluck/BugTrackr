import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AdminRoute, ProtectedRoute, PublicRoute } from './components/RouteGuards'
import WithHeaderFooterLayout from './components/WithHeaderFooterLayout'
import { AuthProvider } from './contexts/AuthContext'
import AdminDashboard from './pages/AdminDashboard'
import CreateBug from './pages/CreateBug'
import Home from './pages/Home'
import NotFound from './pages/NoFound'
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
                <WithHeaderFooterLayout>
                  <Home />
                </WithHeaderFooterLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path='/create-bug'
            element={
              <ProtectedRoute>
                <WithHeaderFooterLayout>
                  <CreateBug />
                </WithHeaderFooterLayout>
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
          <Route
            path='/admin'
            element={
              <AdminRoute>
                <WithHeaderFooterLayout>
                  <AdminDashboard />
                </WithHeaderFooterLayout>
              </AdminRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
