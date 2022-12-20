import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchGetAllGroup = createAsyncThunk('group/fetchGetAllGroup', async () => {
  try {
    const { data } = await axios.get('/group/getAll');

    return data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchAbiturs = createAsyncThunk('group/fetchGetAllAbiturs', async () => {
  try {
    const { data } = await axios.get('/group/abiturs');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchTeacher = createAsyncThunk('group/fetchGetAllTeacher', async () => {
  try {
    const { data } = await axios.get('/group/getTeach');

    return data.user;
  } catch (error) {
    console.log(error);
  }
});

export const fetchGetSubjects = createAsyncThunk('group/fetchGetSubjects', async () => {
  try {
    const { data } = await axios.get('/group/getSubject');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchNewSubject = createAsyncThunk('group/fetchNewSubject', async ({ params }) => {
  try {
    const { data } = await axios.post('/group/createSubject', params);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchNewGroup = createAsyncThunk('group/fetchNewGroup', async ({ params }) => {
  try {
    const { data } = await axios.post('group/createGroup', params);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  data: null,
  teacher: null,
  abiturs: null,
  subjects: null,
  status: 'loading',
  message: null,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetAllGroup.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchGetAllGroup.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload.groups;
      state.message = action.payload?.message;
    },
    [fetchGetAllGroup.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
      state.message = action.payload?.message;
    },

    [fetchAbiturs.pending]: (state) => {
      state.status = 'loading';
      state.abiturs = null;
    },
    [fetchAbiturs.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.abiturs = action.payload;
      state.message = action.payload?.message;
    },
    [fetchAbiturs.rejected]: (state, action) => {
      state.status = 'error';
      state.abiturs = null;
      state.message = action.payload?.message;
    },

    [fetchTeacher.pending]: (state) => {
      state.status = 'loading';
      state.teacher = null;
    },
    [fetchTeacher.fulfilled]: (state, action) => {
      state.status = 'loaded';

      state.teacher = action.payload;
    },
    [fetchTeacher.rejected]: (state, action) => {
      state.status = 'error';
      state.teacher = null;
      state.message = action.payload?.message;
    },

    [fetchNewSubject.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchNewSubject.fulfilled]: (state, action) => {
      state.status = 'loaded';
    },
    [fetchNewSubject.rejected]: (state, action) => {
      state.status = 'error';

      state.message = action.payload?.message;
    },

    [fetchGetSubjects.pending]: (state) => {
      state.status = 'loading';
      state.subjects = null;
    },
    [fetchGetSubjects.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.subjects = action.payload;
    },
    [fetchGetSubjects.rejected]: (state, action) => {
      state.status = 'error';
      state.subjects = null;
      state.message = action.payload?.message;
    },

    [fetchNewGroup.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchNewGroup.fulfilled]: (state, action) => {
      state.status = 'loaded';
    },
    [fetchNewGroup.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});

export const groupReducer = groupSlice.reducer;
