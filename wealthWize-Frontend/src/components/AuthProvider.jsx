import { useReducer, useEffect } from "react";
import UserReducer from "../reducers/UserReducer";
import UserContext from "../context/UserContext";
import { fetchUserCategories } from "../slices/categorySlice";
import { fetchUserExpenses } from "../slices/expenseSlice";
import { useDispatch } from "react-redux";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { LOGIN, LOGOUT, SERVER_ERROR } from "./action";
//----------------------------------------------------------------------------------------
const initialState = {
  isLoggedIn: false,
  user: null,
  serverError: "",
};
//-----------------------------------------------------------------------------------------------------------
export default function AuthProvider(props) {
  const [state, Dispatch] = useReducer(UserReducer, initialState);
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  //---------------------------------------------------------------------------------------------------------
  const handleRegister = async (formData, resetForm) => {
    try {
      const response = await axios.post("/user/register", formData);
      console.log(response.data);

      Dispatch({ type: SERVER_ERROR, payload: "" });
      navigate("/login");

      resetForm();
    } catch (err) {
      console.log(err);
      Dispatch({ type: SERVER_ERROR, payload: err.response.data.error });
    }
  };
  //---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const fetchUser = async () => {
        try {
          const response = await axios.get("/user/account", {
            headers: { Authorization: localStorage.getItem("token") },
          });
          Dispatch({ type: LOGIN, payload: response.data });
        } catch (err) {
          alert(err.message);
        }
      };
      fetchUser();
    }
  }, []);
  //---------------------------------------------------------------------------------------------------------
  const handleLogin = async (formData, resetForm) => {
    try {
      const response = await axios.post("/user/login", formData);
      localStorage.setItem("token", response.data.token);
      const userResponse = await axios.get("/user/account", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      console.log(userResponse.data);

      Dispatch({ type: LOGIN, payload: userResponse.data });
      resetForm();
      reduxDispatch(fetchUserCategories());
      reduxDispatch(fetchUserExpenses());
      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      Dispatch({ type: SERVER_ERROR, payload: err.response.data.error });
    }
  };
  //---------------------------------------------------------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    Dispatch({ type: LOGOUT });
    navigate("/login");
  };
  //------------------------------------------------------------------------------------------------
  return (
    <UserContext.Provider
      value={{ ...state, handleRegister, handleLogin, handleLogout }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
