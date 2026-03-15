import {
  removeCategories,
  assignEditId,
  resetEditId,
} from "../slices/categorySlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AiOutlineDelete, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";   // ✅ SweetAlert Import

export default function CategoriesList() {
  const { data, editId } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetEditId());
    };
  }, []);

  // ✅ SweetAlert Delete
  const handleRemove = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    dispatch(removeCategories(id));

    await Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Category removed successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // ✅ SweetAlert Cancel Edit
  const handleCancel = async () => {
    const confirm = await Swal.fire({
      title: "Cancel editing?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (confirm.isConfirmed) {
      dispatch(resetEditId());
    }
  };

  return (
    <Card className="border-teal-400 rounded-2xl shadow-md mt-6">
      <CardHeader>
        <CardTitle className="text-xl text-center font-semibold">
          Categories List ({data.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="w-full">
          {data.map((ele) => {
            return (
              <li key={ele._id}>
                <div className="flex justify-between items-center py-3">

                  <span className="font-medium text-black pl-2">
                    {ele.name}
                  </span>

                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => dispatch(assignEditId(ele._id))}
                    >
                      <AiOutlineEdit />
                    </Button>

                    {/* Cancel Button if editing */}
                    {ele._id === editId && (
                      <Button size="sm" variant="ghost" onClick={handleCancel}>
                        <AiOutlineClose />
                      </Button>
                    )}

                    {/* Delete Button */}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(ele._id)}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </div>
                </div>

                <Separator />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
