// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, CircularProgress  } from '@mui/material';
import { login, setAuthToken } from '../utils/api';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true)
    try {
      const data = await axios.post('https://api.pmcweb.vn/api/v1/user/login', { UserName: username, Password: password }, {
        headers: { 'Content-Type': 'application/json'}
      });
      await localStorage.setItem('accessToken', data?.data?.token);
      setLoading(false)
      setAuthToken(data?.data.token); 
      if (data?.data?.user?.isRole === 1){
        navigate('/vattu');
        // navigate('/home');
      } else if ((data?.data?.user?.isRole === 2)){
        navigate('/ketoan'); 
      } else {
        navigate('/home');
      }
    } catch (error) {
      setLoading(false)
      alert(`Login failed. Please check your username and password. ${error}`);
    }
  };

  return (
    <Container maxWidth="xs">
  <Box sx={{ mt: 8, textAlign: 'center' }}>
    <Typography variant="h4">Login</Typography>
    {/* Bọc các input và button trong một form */}
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Ngăn trang bị tải lại
        handleLogin(); // Gọi hàm xử lý login

      }}
    >
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        type="submit" // Đặt type là submit
      >
       {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </form>
  </Box>
</Container>

  );
};

export default Login;
