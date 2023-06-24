import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Detail from './components/Detail'
import ProtectRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={
            <ProtectRoute.ProtectedRoute>
              <Home />
            </ProtectRoute.ProtectedRoute>
          } />
          <Route path="/login" element={
            <ProtectRoute.ProtectedRouteLogin>
              <Login />   
            </ProtectRoute.ProtectedRouteLogin>
          } />
          <Route path="/register" element={
            <ProtectRoute.ProtectedRouteLogin>
              <Register />
            </ProtectRoute.ProtectedRouteLogin>
          } />
          <Route path="/detail/:id" element={
            <ProtectRoute.ProtectedRoute>
              <Detail />
            </ProtectRoute.ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}
export default App;
