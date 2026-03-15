import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";
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

//----------------------------------------------------------------------------------------
export default function Dashboard() {
  const { user } = useContext(UserContext);
  const { data: categoryData } = useSelector((state) => {
    return state.category;
  });
  const { data: expenseData } = useSelector((state) => {
    return state.expense;
  });
  //-----------------------------------------------------------------------------------------

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <BounceLoader color="#009688" size={100} />
      </div>
    );
  }
  //-------------------------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-md border-teal-400 rounded-2xl ">
        <CardHeader>
          <CardTitle className="text-center font-semibold text-2xl">
            Dashboard Page
          </CardTitle>
        </CardHeader>
        <Separator/>
        <CardContent>
          <p className="text-center font-semibold">Welcome {user.username}</p>
          <p className="text-center font-semibold">
            Total Categories-{categoryData.length}
          </p>
          <p className="text-center font-semibold">
            Total Expenses-{expenseData.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
