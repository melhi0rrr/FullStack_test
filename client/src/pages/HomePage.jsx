import React, { useEffect } from 'react';
import { 
  Container, 
  Box, 
  Button,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import UserList from '../components/UserList';

const HomePage = () => {
  const { fetchUsers, currentPage } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]); 

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={4} alignItems="center">
        <Typography variant="h4" component="h1">
          Список пользователей
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/create')}
        >
          Добавить пользователя
        </Button>
      </Box>
      
      <UserList />
    </Container>
  );
};

export default HomePage;