// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Vattu from './pages/Vattu'
import Detail from './pages/Detail';
import DetailVattu from './pages/DetailVattu';
import Add from './pages/Add';
import AddVattu from './pages/AddVattu'
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
        <Route
          path="/vattu"
          element={<ProtectedRoute><Vattu /></ProtectedRoute>}
        />
         <Route path="/detail/:id" element={<Detail />} /> {/* Thêm route cho trang chi tiết */}
         <Route path="/detail-vattu/:id" element={<DetailVattu />} /> {/* Thêm route cho trang chi tiết */}
         <Route path="/new" element={<Add />} /> {/* Thêm route cho trang chi tiết */}
         <Route path="/newVattu" element={<AddVattu />} /> {/* Thêm route cho trang chi tiết */}
    
      </Routes>
    </Router>
  );
}

export default App;
