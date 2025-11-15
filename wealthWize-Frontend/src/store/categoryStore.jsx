import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/categorySlice";
import expenseReducer from "../slices/expenseSlice";
const createStore = () => {
  return configureStore({
    reducer: {
      category: categoryReducer,
      expense: expenseReducer,
    },
  });
};
export default createStore;
