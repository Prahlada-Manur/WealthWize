import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <Card className="w-full max-w-md border-teal-300 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center font-semibold text-2xl text-shadow-black">
            Login Here!!
          </CardTitle>
        </CardHeader>
        <CardContent>
          {serverError && (
            <p className="text-red-600 text-center">{serverError}</p>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>Enter email</label>
              <Input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter email"
                className="border-teal-400"
              />
            </div>
            <div>
              <label>Enter password</label>
              <Input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter password"
                className="border-teal-400"
              />
            </div>
            
              <CardFooter className="pt-4">
                <Button type="submit" className="w-full hover:text-teal-600">Login</Button>
              </CardFooter>
              
          
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
