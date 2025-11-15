import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";
//------------------------------------------------------------------------
export default function UserList() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  //-----------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/users", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  //--------------------------------------------------------------------------
  const handleRemove = async (id, email) => {
    const userConfirm = window.confirm("Are you sure?");
    if (userConfirm) {
      const input = window.prompt("Enter Email to delete");
      if (input == email) {
        try {
          const response = await axios.delete(`/users/${id}`, {
            headers: { Authorization: localStorage.getItem("token") },
          });
          console.log(response.data);
          const newArr = users.filter((ele) => ele._id !== id);
          setUsers(newArr);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("incorrect email");
      }
    }
  };
  //------------------------------------------------------------------------------------------------------------------
  if (!user) {
    return <h4>loading...</h4>;
  }
  return (
    <div>
      <h2>User List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            {user.role === "admin" && <th>action</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((ele) => {
            return (
              <tr key={ele._id}>
                <td>{ele.username}</td>
                <td>{ele.email}</td>
                <td>{ele.role}</td>
                <td>
                  {user._id != ele._id && (
                    <button
                      onClick={() => {
                        handleRemove(ele._id, ele.email);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
