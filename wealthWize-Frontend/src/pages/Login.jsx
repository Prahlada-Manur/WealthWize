import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";
//--------------------------------------------------------------------------------------------------------------
export default function Login() {
  const { handleLogin, serverError } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleLogin(values, resetForm);
    },
  });
  //--------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <h2>Login Here!!</h2>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      <form onSubmit={formik.handleSubmit}>
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
          <input type="submit" value="login" />
        </div>
      </form>
    </div>
  );
}
