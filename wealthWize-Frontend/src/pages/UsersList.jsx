import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";
import Swal from "sweetalert2";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/users", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // ------------------------- DELETE HANDLER WITH SWEET ALERT -------------------------
  const handleRemove = async (id, email) => {
    // Step 1 — Confirm delete
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete user",
    });

    if (!confirmResult.isConfirmed) return;
    const { value: inputEmail } = await Swal.fire({
      title: "Enter user email to confirm delete",
      input: "text",
      inputPlaceholder: "Enter exact email",
      showCancelButton: true,
    });

    if (!inputEmail) return;

    if (inputEmail !== email) {
      Swal.fire({
        icon: "error",
        title: "Incorrect email!",
        text: "The entered email does not match.",
      });
      return;
    }

    try {
      await axios.delete(`/users/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setUsers(users.filter((ele) => ele._id !== id));

      Swal.fire({
        icon: "success",
        title: "User deleted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Failed to delete the user.",
      });
    }
  };

  // -----------------------------------------------------------------------------------

  if (!user) return <h4>Loading...</h4>;

  return (
    <div className="min-h-screen px-4 py-6">
      <Card className="border-teal-400 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            User List
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader className="border-teal-300">
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                {user.role === "admin" && (
                  <TableHead className="text-center">Action</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((ele) => (
                <TableRow
                  key={ele._id}
                  className="hover:bg-teal-50 transition"
                >
                  <TableCell>{ele.username}</TableCell>
                  <TableCell>{ele.email}</TableCell>
                  <TableCell>{ele.role}</TableCell>

                  {user.role === "admin" && (
                    <TableCell className="text-center">
                      {user._id !== ele._id && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemove(ele._id, ele.email)}
                        >
                          <AiOutlineDelete />
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {users.length === 0 && (
            <p className="text-center text-gray-600 mt-4">
              No users found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
