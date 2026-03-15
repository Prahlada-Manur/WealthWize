import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { deleteExpense, assignEditId } from "../slices/expenseSlice";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";

import Swal from "sweetalert2"; // ✅ Added SweetAlert

export default function ExpenseTable() {
  const { data } = useSelector((state) => state.expense);
  const categoryData = useSelector((state) => state.category.data);
  const dispatch = useDispatch();

  // ✅ SweetAlert2 delete popup
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Expense?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirm.isConfirmed) return;

    dispatch(deleteExpense(id));

    // Success Popup
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Expense removed successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <Card className="mt-6 border-teal-400 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Expense List
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader className="border-teal-300">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((ele, i) => {
              const categoryName =
                categoryData.find((c) => c._id === ele.category)?.name || "N/A";

              return (
                <TableRow key={ele._id} className="hover:bg-teal-50 transition">
                  <TableCell>{i + 1}</TableCell>

                  <TableCell className="font-medium">{ele.title}</TableCell>

                  <TableCell>
                    {format(
                      new Date(ele.expenseDate || new Date()),
                      "dd/MM/yyyy"
                    )}
                  </TableCell>

                  <TableCell>₹{ele.amount}</TableCell>

                  <TableCell>{ele.description}</TableCell>

                  <TableCell>{categoryName}</TableCell>

                  <TableCell className="flex gap-2 justify-center">
                    {/* DELETE BUTTON */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(ele._id)}
                    >
                      <AiOutlineDelete />
                    </Button>

                    {/* EDIT BUTTON */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-teal-500 text-teal-700 hover:bg-teal-100"
                      onClick={() => dispatch(assignEditId(ele._id))}
                    >
                      <AiOutlineEdit />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
