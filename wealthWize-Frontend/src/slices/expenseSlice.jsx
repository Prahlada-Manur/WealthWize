import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchUserExpenses = createAsyncThunk(
  "expense/fetchUserExpenses",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/account/expense", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async ({ formData, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/account/expense", formData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      resetForm();
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);
export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id,{rejectWithValue}) => {
    try {
      const response = await axios.delete(`/user/account/expense/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error)
    }
  }
);
export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async ({ editId, formData, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/user/account/expense/${editId}`,
        formData,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      resetForm();
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    data: [],
    errors: null,
    loading: false,
    editId: null,
  },
  reducers: {
    resetExpense: (state) => {
      (state.data = []), (state.errors = null), (state.loading = false);
    },
    assignEditId: (state, action) => {
      state.editId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserExpenses.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.errors = null;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        const idx = state.data.findIndex(
          (ele) => ele._id == action.payload._id
        );
        state.data.splice(idx, 1);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const idx = state.data.findIndex(
          (ele) => ele._id == action.payload._id
        );
        state.data[idx] = action.payload;
        state.errors = null;
        state.editId = null;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});
export default expenseSlice.reducer;
export const { resetExpense, assignEditId } = expenseSlice.actions;
