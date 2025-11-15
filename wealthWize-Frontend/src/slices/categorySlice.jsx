import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchUserCategories = createAsyncThunk(
  "category/fetchUserCategories",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/account/category", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
export const addUserCategories = createAsyncThunk(
  "category/addUserCategories",
  async ({ formData, handleReset }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/account/category", formData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      console.log(response.data);
      handleReset();
      return response.data;
    } catch (err) {
      console.log(err.response.data.error);
      return rejectWithValue(err.response.data.error);
    }
  }
);
export const removeCategories = createAsyncThunk(
  "category/removeCategories",
  async (id) => {
    try {
      const response = await axios.delete(`/user/account/category/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const updateCategories = createAsyncThunk(
  "category/updateCategories",
  async ({ editId, formData, handleReset }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/user/account/category/${editId}`,
        formData,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log(response.data);

      handleReset();
      return response.data;
    } catch (err) {
      console.log(err);
      rejectWithValue(err.message);
    }
  }
);
//---------------------------------------------------------------------------------------------------------------------------------------------------------
const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    errors: null,
    loading: null,
    editId: null,
  },
  reducers: {
    resetCategory: (state) => {
      (state.data = []), (state.errors = null), (state.loading = false);
    },
    assignEditId: (state, action) => {
      state.editId = action.payload;
    },
    resetEditId: (state) => {
      state.editId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.errors = null;
      })
      .addCase(addUserCategories.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.errors = null;
      })
      .addCase(addUserCategories.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(removeCategories.fulfilled, (state, action) => {
        const idx = state.data.findIndex(
          (ele) => ele._id == action.payload._id
        );
        state.data.splice(idx, 1);
      })
      .addCase(updateCategories.fulfilled, (state, action) => {
        const idx = state.data.findIndex(
          (ele) => ele._id == action.payload._id
        );
        state.data[idx] = action.payload;
        state.errors = null;
        state.editId = null;
      })
      .addCase(updateCategories.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
export default categorySlice.reducer;
export const { resetCategory, assignEditId,resetEditId } = categorySlice.actions;
