import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import Home from './pages/Home';
import { Register } from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;