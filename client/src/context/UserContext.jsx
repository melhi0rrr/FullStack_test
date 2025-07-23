import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import * as api from '../services/api';

const UserContext = createContext();

const initialState = {
  users: [],
  currentPage: 1,
  totalPages: 1,
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_USER':
      return {
        ...state,
        users: [action.payload, ...state.users.slice(0, 9)] 
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = useCallback(async (page = 1, limit = 10) => {
    try {
      dispatch({ type: 'FETCH_START' });
      const response = await api.getUsers(page, limit);
      
      const responseData = response.data;
      
      if (!responseData.data || !responseData.totalPages) {
        throw new Error('Некорректный формат ответа сервера');
      }
      
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: {
          users: responseData.data,
          totalPages: responseData.totalPages,
          currentPage: page,
        },
      });
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
      dispatch({ 
        type: 'FETCH_ERROR', 
        payload: error.message || 'Ошибка загрузки данных'
      });
    }
  }, []);

  const addUser = useCallback(async user => {
    try {
      console.log('Creating user:', user);
      const response = await api.createUser(user);
      const newUser = response.data;
      
      dispatch({ type: 'ADD_USER', payload: newUser });
      return newUser;
    } catch (error) {
      console.error('Ошибка создания пользователя:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      throw error;
    }
  }, []);

  const updateUser = useCallback(async (id, user) => {
    try {
      console.log('Updating user:', user);
      const response = await api.updateUser(id, user);
      const updatedUser = response.data;
      
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      return updatedUser;
    } catch (error) {
      console.error('Ошибка обновления пользователя:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      throw error;
    }
  }, []);

  const deleteUser = useCallback(async id => {
    try {
      await api.deleteUser(id);
      dispatch({ type: 'DELETE_USER', payload: id });
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
      throw error;
    }
  }, []);

  const setPage = useCallback(page => {
    dispatch({ type: 'SET_PAGE', payload: page });
    fetchUsers(page);
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
        setPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);