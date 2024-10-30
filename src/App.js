// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Add from './pages/Add';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
         <Route path="/detail/:id" element={<Detail />} /> {/* Thêm route cho trang chi tiết */}
         <Route path="/new" element={<Add />} /> {/* Thêm route cho trang chi tiết */}
    
      </Routes>
    </Router>
  );
}

export default App;
