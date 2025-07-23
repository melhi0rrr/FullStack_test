import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Управление пользователями
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateUserPage />} />
            <Route path="/edit/:id" element={<EditUserPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;