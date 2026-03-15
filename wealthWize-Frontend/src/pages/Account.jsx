import { useContext } from "react";
import UserContext from "../context/UserContext";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BounceLoader } from "react-spinners";
//------------------------------------------------------------------------------------------
export default function Account() {
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <BounceLoader color="#009688" size={100} />
      </div>
    );
  }
  //----------------------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <Card className="w-full max-w-md border-teal-500 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center font-semibold text-2xl">
            Account Page
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator/>
          <div>
            <p className="text-center  font-semibold">Name={user.username}</p>
          </div>
          <div>
            <p className="text-center font-semibold">Email={user.email}</p>
          </div>
          <div>
            <p className="text-center font-semibold">User Role={user.role.toUpperCase()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
