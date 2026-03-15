import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../slices/expenseSlice";
import { format } from "date-fns";
import { AiOutlineCalendar } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExpenseForm() {
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
    <div className="w-full max-w-md mx-auto px-4">
      <Card className="border-teal-400 mt-3 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-xl text-center font-semibold">
            {editId ? "Edit Expense" : "Add expense"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {errors && <p className="text-red-500 mb-2 text-center">{errors}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col">
                <Input
                  type="text"
                  value={form.title}
                  name="title"
                  placeholder="Add expense"
                  onChange={handleChange}
                  className=" border-teal-300 focus:border-teal-500 "
                />
              </div>
              <div className="flex flex-col">
                <Input
                  type="Date"
                  value={form.expenseDate}
                  name="expenseDate"
                  placeholder="Enter Expense Date"
                  onChange={handleChange}
                  className=" border-teal-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Select
                  value={form.category || "none"}
                  onValueChange={(val) =>
                    setForm({
                      ...form,
                      category: val === "none" ? "" : val,
                    })
                  }
                >
                  <SelectTrigger className="border-teal-300">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="none">— none —</SelectItem>

                    {categoryData.map((ele) => (
                      <SelectItem key={ele._id} value={ele._id}>
                        {ele.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Input
                  type="text"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="border-teal-300"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="border-teal-300"
              />
            </div>
            <CardFooter>
              <Button type="submit" className="w-full">
                {editId ? "update" : "Add"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
