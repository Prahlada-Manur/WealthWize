import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col justify-center items-center min-h-screen px-4 ">
      <Card className="w-full max-w-md border-teal-300 rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-black">
            Register With Us!!
          </CardTitle>
        </CardHeader>
        <CardContent>
          {serverError && (
            <p className="text-red-600 text-center">{serverError}</p>
          )}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-1">
              <label>Enter Name</label>
              <Input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Enter Name"
                className="border-teal-400"
              />
            </div>
            <div className="flex flex-col gap-1">
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
            <div className="flex flex-col gap-1">
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
            <CardFooter className="pt-2">
              <Button type="submit" className="w-full hover:text-teal-400">
                Register
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
