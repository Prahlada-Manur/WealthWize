import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserCategories, updateCategories } from "../slices/categorySlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//--------------------------------------------------------------------------------------------------------------------------------------
export default function CategoriesForm() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { data, editId, errors } = useSelector((state) => {
    return state.category;
  });

  //-------------------------------------------------------------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category to be added:", name);
    const formData = { name };
    const handleReset = () => {
      setName("");
    };
    if (editId) {
      dispatch(updateCategories({ editId, formData, handleReset }));
    } else {
      dispatch(addUserCategories({ formData, handleReset }));
    }
  };
  //-------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (editId) {
      const category = data.find((ele) => ele._id == editId);
      setName(category.name);
    } else {
      setName("");
    }
  }, [editId]);
  //--------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <Card className="border-teal-300 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl text-center font-semibold">{editId ? "Edit Category" : "Add Category"}</CardTitle>
      </CardHeader>
      <CardContent>
        {errors && <p className="text-red-600 mb-2">{errors}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Category Name"
            className="border-teal-300"
          />
          <Button type="submit" className="w-full hover:text-teal-300">{editId ? "update" : "Add"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
