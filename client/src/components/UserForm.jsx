import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { 
  TextField, 
  Button, 
  Container, 
  Grid, 
  MenuItem, 
  Typography,
  Box
} from '@mui/material';

const UserForm = ({ editMode }) => {
  const { id } = useParams();
  const { users, addUser, updateUser } = useUserContext();
  const navigate = useNavigate();
  
  const userToEdit = users.find(user => user.id === parseInt(id));
  
  const [user, setUser] = useState({
    firstName: editMode ? userToEdit?.firstName || '' : '',
    lastName: editMode ? userToEdit?.lastName || '' : '',
    height: editMode ? userToEdit?.height || '' : '',
    weight: editMode ? userToEdit?.weight || '' : '',
    gender: editMode ? userToEdit?.gender || 'male' : 'male',
    address: editMode ? userToEdit?.address || '' : '',
    photo: editMode ? userToEdit?.photo || '' : '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
  
  if (!user.firstName.trim()) newErrors.firstName = 'First name is required';
  if (!user.lastName.trim()) newErrors.lastName = 'Last name is required';
  
  // Проверяем, что height - число
  if (isNaN(user.height)) {
    newErrors.height = 'Height must be a number';
  } else if (Number(user.height) <= 0) {
    newErrors.height = 'Height must be positive';
  }
  
  // Проверяем, что weight - число
  if (isNaN(user.weight)) {
    newErrors.weight = 'Weight must be a number';
  } else if (Number(user.weight) <= 0) {
    newErrors.weight = 'Weight must be positive';
  }
  
  if (!user.address.trim()) newErrors.address = 'Address is required';
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async e => {
  e.preventDefault();

  const userData = {
    ...user,
    height: Number(user.height),
    weight: Number(user.weight)
  };

  if (!validate(userData)) return;
  
  try {
    if (editMode) {
      await updateUser(id, userData);
    } else {
      await addUser(userData);
    }
    navigate('/');
  } catch (error) {
    console.error('Error saving user:', error);
    
    // Добавим вывод подробной информации об ошибке
    if (error.response) {
      console.error('Server response:', error.response.data);
    }
  }
};

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          {editMode ? 'Edit User' : 'Create New User'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Height (cm)"
                name="height"
                type="number"
                value={user.height}
                onChange={handleChange}
                error={!!errors.height}
                helperText={errors.height}
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={user.weight}
                onChange={handleChange}
                error={!!errors.weight}
                helperText={errors.weight}
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={user.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                required
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Photo URL"
                name="photo"
                value={user.photo}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              {user.photo && (
                <Box mt={2} textAlign="center">
                  <img 
                    src={user.photo} 
                    alt="Preview" 
                    style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 4 }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                fullWidth
              >
                {editMode ? 'Update User' : 'Create User'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default UserForm;