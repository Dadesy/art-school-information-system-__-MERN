import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchNewApplication = createAsyncThunk('auth/fetchNewApplication', async () => {
  try {
    const { data } = await axios.post('/application/createApplication');

    return data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchMyApplication = createAsyncThunk('application/MyApplication', async () => {
  try {
    const { data } = await axios.get('application/getMyApplication');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchAllApplication = createAsyncThunk('application/AllApplication', async () => {
  try {
    const { data } = await axios.get('/application/getAll');

    return data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchRemoveApplication = createAsyncThunk(
  'application/RemoveApplication',
  async (id) => {
    try {
      const { data } = await axios.delete(`/application/removeApplication/${id}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const fetchUpdateApplication = createAsyncThunk(
  'application/RemoveApplication',
  async ({ id, applicationStatus }) => {
    console.log(applicationStatus);
    try {
      const { data } = await axios.patch(`/application/updateApplication/${id}`, {
        applicationStatus,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  data: null,
  group: null,
  status: 'loading',
  message: '',
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNewApplication.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchNewApplication.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.message = action.payload?.message;
    },
    [fetchNewApplication.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.message = action.payload?.message;
    },

    [fetchMyApplication.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchMyApplication.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload?.application.status;
      state.message = action.payload?.message;
    },
    [fetchMyApplication.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.message = action.payload?.message;
    },

    [fetchAllApplication.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAllApplication.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
      console.log(action.payload);
      state.message = action.payload;
    },
    [fetchAllApplication.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.message = action.payload?.message;
    },

    [fetchRemoveApplication.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRemoveApplication.fulfilled]: (state, action) => {
      state.status = 'loaded';
    },
    [fetchRemoveApplication.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },

    [fetchUpdateApplication.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUpdateApplication.fulfilled]: (state, action) => {
      state.status = 'loaded';
    },
    [fetchUpdateApplication.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const applicationReducer = applicationSlice.reducer;
