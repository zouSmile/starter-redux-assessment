import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(/* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
    'suggestion/fetchSuggestion',
    async (arg, thunkAPI) => {
      const respons = await fetch('http://localhost:3004/api/suggestion');
      const {data} = await respons.json();
      return data;
    }
  );

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
    [fetchSuggestion.pending]: (state) => {
      state.loading = true;
      state.error = false;
    }, 
    [fetchSuggestion.fulfilled]: (state, {payload: {caption, imageUrl}}) => {
      state.suggestion = {caption, imageUrl};
      state.loading = false;
      state.error = false;
    }, 
    [fetchSuggestion.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    }, 
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;

