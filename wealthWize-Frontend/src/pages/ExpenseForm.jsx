import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../slices/expenseSlice";
import { format } from "date-fns";

export default function ExpenseForm() {
  // Select categories for the category dropdown and expense slice for edit state
  const { data: categoryData } = useSelector((state) => state.category);
  const {
    data: expenseData,
    errors,
    editId,
  } = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    expenseDate: "",
    amount: "",
    category: "",
    description: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: form.title,
      expenseDate: form.expenseDate ? new Date(form.expenseDate) : null,
      amount: form.amount ? Number(form.amount) : 0,
      category: form.category,
      description: form.description,
    };
    const resetForm = () => {
      setForm({
        title: "",
        expenseDate: "",
        amount: "",
        category: "",
        description: "",
      });
    };

    if (editId) {
      dispatch(updateExpense({ editId, formData, resetForm }));
    } else {
      dispatch(addExpense({ formData, resetForm }));
    }
  };
  useEffect(() => {
    if (editId) {
      const expense = expenseData.find((ele) => ele._id === editId);
      if (expense) {
        const safeDate =
          expense.expenseDate && !isNaN(new Date(expense.expenseDate))
            ? format(new Date(expense.expenseDate), "yyyy-MM-dd")
            : "";
        setForm({
          title: expense.title,
          expenseDate: safeDate,
          amount: expense.amount !== undefined ? String(expense.amount) : "",
          category: expense.category,
          description: expense.description,
        });
      }
    } else {
      setForm({
        title: "",
        expenseDate: "",
        amount: "",
        category: "",
        description: "",
      });
    }
  }, [editId]);
  return (
    <div>
      <h4>{editId ? "Edit Expense" : "Add expense"}</h4>
      {errors && <p>{errors}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={form.title}
            name="title"
            placecholder="Add expense"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="Date"
            value={form.expenseDate}
            name="expenseDate"
            placeholder="Enter Expense Date"
            onChange={handleChange}
          />
        </div>
        <div>
          <select value={form.category} name="category" onChange={handleChange}>
            <option value="">Select Category</option>
            {categoryData.map((ele) => {
              return (
                <option key={ele._id} value={ele._id}>
                  {ele.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <input
            type="text"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
