import React from 'react';
import { 
  Grid, 
  CircularProgress, 
  Alert, 
  Box, 
  Typography,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import UserCard from './UserCard';
import Pagination from './Pagination';

const UserList = () => {
  const { 
    users, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    setPage 
  } = useUserContext();
  const navigate = useNavigate();

  if (loading && users.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">
          Ошибка загрузки пользователей: {error}
        </Alert>
        <Button 
          variant="outlined" 
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Повторить попытку
        </Button>
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box textAlign="center" p={4} bgcolor="#f9f9f9" borderRadius={2}>
        <Typography variant="h6" gutterBottom>
          Пользователи не найдены
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Начните с добавления первого пользователя
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/create')}
        >
          Добавить пользователя
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </>
  );
};

export default UserList;