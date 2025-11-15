import {
  removeCategories,
  assignEditId,
  resetEditId,
} from "../slices/categorySlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//-------------------------------------------------------------------------------------------------------------------------------
export default function CategoriesList() {
  const { data, errors, editId } = useSelector((state) => {
    return state.category;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      console.log("Component unmounted");
      dispatch(resetEditId()); // this is cleanup work where we have to do it when the user visits different page and redirects back to this page
    };
  }, []);
  //-------------------------------------------------------------------
  const handleRemove = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch(removeCategories(id));
    }
  };
  const handleCancel = () => {
    dispatch(resetEditId());
  };
  //---------------------------------------------------------------------------------
  return (
    <div>
      <h4>Categories List---{data.length}</h4>
      
      <ul>
        {data.map((ele) => {
          return (
            <li key={ele._id}>
              {ele.name}
              <button
                onClick={() => {
                  dispatch(assignEditId(ele._id));
                }}
              >
                Edit
              </button>
              {ele._id == editId && (
                <button onClick={handleCancel}>Cancel</button>
              )}
              <button
                onClick={() => {
                  handleRemove(ele._id);
                }}
              >
                remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
