import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { LoginPage } from '../pages/Login'
import { RegisterPage } from '../pages/Register'
import { HomePage } from '../pages/Home'
import Layout from '../ui/Layout'

const isAuthenticated = true

const AppRoutes = () => {
  return (
    <Router basename='/Kumbulink'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            path='/'
            element={isAuthenticated ? <HomePage /> : <Navigate to='/login' />}
          />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
