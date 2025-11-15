import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserCategories, updateCategories } from "../slices/categorySlice";
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
    <div>
      <h4>{editId ? "Edit Category" : "Add Category"}</h4>
      {errors && <p>{errors}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Category Name"
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
