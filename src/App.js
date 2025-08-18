import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Home from './pages/Home';
import {PrivateRoute} from './components/PrivateRoute';

import { AuthProvider } from './context/AuthContext';
//import { Header } from './components/Header';


function App() {
  return (
    
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route 
              path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;