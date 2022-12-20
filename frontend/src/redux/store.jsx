import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { applicationReducer } from './slices/application';
import { groupReducer } from './slices/group';

const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    group: groupReducer,
  },
});

export default store;
