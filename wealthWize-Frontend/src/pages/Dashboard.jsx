import { useContext } from "react";
import UserContext from "../context/UserContext";
import {  useSelector } from "react-redux";
//----------------------------------------------------------------------------------------
export default function Dashboard() {
  const { user } = useContext(UserContext);
  const { data: categoryData } = useSelector((state) => {
    return state.category;
  });
  const { data: expenseData } = useSelector((state) => {
    return state.expense;
  });
  //-----------------------------------------------------------------------------------------
 
  if (!user) {
    return <h5>Loading....</h5>;
  }
  //-------------------------------------------------------------------------------------------
  return (
    <div>
      <h2>Dashboard Page</h2>
      <h4>Welcome {user.username}</h4>
      <h4>Total Categories-{categoryData.length}</h4>
      <h4>Total Expenses-{expenseData.length}</h4>
    </div>
  );
}
