import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  Button, 
  Grid, 
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const { deleteUser } = useUserContext();

  const handleEdit = () => {
    navigate(`/edit/${user.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(user.id);
    }
  };

  return (
    <Card sx={{ mb: 2, height: '100%' }}>
      <Grid container>
        <Grid item xs={4}>
          {user.photo ? (
            <CardMedia
              component="img"
              image={user.photo}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ height: 180, objectFit: 'cover' }}
            />
          ) : (
            <Box 
              sx={{ 
                height: 180, 
                bgcolor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2">No Photo</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {user.gender === 'male' ? 'Male' : user.gender === 'female' ? 'Female' : 'Other'}
            </Typography>
            <Typography variant="body2">
              <strong>Height:</strong> {user.height} cm
            </Typography>
            <Typography variant="body2">
              <strong>Weight:</strong> {user.weight} kg
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Address:</strong> {user.address}
            </Typography>
            <Box mt={2} display="flex" gap={1}>
              <Button 
                variant="outlined" 
                color="primary"
                size="small"
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button 
                variant="outlined" 
                color="error"
                size="small"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCard;