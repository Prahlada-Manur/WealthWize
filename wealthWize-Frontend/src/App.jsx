import { Link, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserList from "./pages/UsersList";
import Expense from "./pages/Expense";
import Categories from "./pages/Categories";
import { useDispatch } from "react-redux";
import { resetCategory, fetchUserCategories } from "./slices/categorySlice";
import { resetExpense, fetchUserExpenses } from "./slices/expenseSlice";

//----------------------------------------------------------------------------------------------------------
export default function App() {
  const { isLoggedIn, handleLogout, user } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUserCategories());
      dispatch(fetchUserExpenses());
    }
  }, [dispatch]);
  //--------------------------------------------------------------------------------------------------------
  return (
    <div>
      <h1>WealthWize</h1>
      <nav>
        <ul className="list-group">
          {!isLoggedIn && !localStorage.getItem("token") ? (
            <>
              <li>
                <Link to="/Home">Home</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/expense">Expense</Link>
              </li>

              {(user?.role === "admin" || user?.role === "moderator") && (
                <li>
                  <Link to="/users-list">List users</Link>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    dispatch(resetCategory());
                    dispatch(resetExpense());
                  }}
                >
                  logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users-list" element={<UserList />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
  );
}

/*
ADD
useState+useReduce+useContext
return {...state,data:[...state.data,obj]}
rtk
state.data.push(obj)

Remove
useState+useReduce+useContext
return {...state,data:state.data.filter(ele=>ele._id != obj._id)}

rtk
const idx=state.data.findIndex(ele=>ele._id == obj._id)
state.data.splice(idx.1)

update
useState+useReduce+useContext
return {...state,data:state.data.map(ele=>{
    if(ele._id == obj._id){
      return {...obj}
    }else{
      return {...obj}
    }
})}

rtk
const idx=state.data.findIndex(ele=>ele._id == obj._id)
state.data[idx]=obj

*/
