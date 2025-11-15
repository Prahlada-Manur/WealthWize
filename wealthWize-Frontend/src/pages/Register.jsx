import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";
//-------------------------------------------------------------------------------------------------
export default function Register() {
  const { handleRegister, serverError } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("form data", values);
      handleRegister(values, resetForm);
    },
  });
  //-----------------------------------------------------------------------------------------------
  return (
    <div>
      <h2>Register With Us!!</h2>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Enter Name</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Enter Name"
          />
        </div>
        <div>
          <label>Enter email</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label>Enter password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter password"
          />
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}
