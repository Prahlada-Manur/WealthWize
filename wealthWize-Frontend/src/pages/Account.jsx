import { useContext } from "react";
import UserContext from "../context/UserContext";
//------------------------------------------------------------------------------------------
export default function Account() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <h5>Loading.....</h5>;
  }
  //----------------------------------------------------------------------------------------
  return (
    <div>
      <h2>Account Page</h2>
      <h4>Email={user.email}</h4>
      <h4>user Role={user.role}</h4>
    </div>
  );
}
