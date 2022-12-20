import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserDataLogin = createAsyncThunk(
  'auth/fetchLogin',
  async ({ dataUser }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', dataUser);
      if (data.accessToken) {
        window.localStorage.setItem('token', data.accessToken);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserDataRegister = createAsyncThunk(
  'auth/fetchRegister',
  async ({ dataUser }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/registration', dataUser);
      if (data.accessToken) {
        window.localStorage.setItem('token', data.accessToken);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAuthMe = createAsyncThunk('auth/refresh', async () => {
  try {
    const { data } = await axios.get('/auth/refresh');

    if (data.accessToken) {
      window.localStorage.setItem('token', data.accessToken);
    }

    return data;
  } catch (e) {
    console.log(e);
  }
});

const initialState = {
  data: null,
  status: 'loading',
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: async (state) => {
      await axios.post('/auth/logout');
      window.localStorage.removeItem('token');
      state.data = null;
    },
  },
  extraReducers: {
    // ?Login
    [fetchUserDataLogin.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserDataLogin.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload.user;
      state.message = action.payload?.message;
    },
    [fetchUserDataLogin.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.message = action.payload?.message;
    },

    // ?Register
    [fetchUserDataRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserDataRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
      state.message = action.payload.message;
    },
    [fetchUserDataRegister.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.message = action.payload?.message;
    },

    // ?AuthMe
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload.user;
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
