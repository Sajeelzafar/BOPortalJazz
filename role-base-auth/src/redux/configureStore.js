import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import usersHandler from './user';

const rootReducer = combineReducers({
    usersHandler
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;