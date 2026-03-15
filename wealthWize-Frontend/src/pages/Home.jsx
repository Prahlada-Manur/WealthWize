import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import heroImg from "../assets/budget185.png"

export default function Home() {
  return (
    <div className="min-h-screen bg-teal-50 px-6 py-10 flex flex-col items-center">

      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-700 leading-tight">
          Take Control of Your Money
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          Track your expenses, analyze your spending, and gain financial clarity — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/register">
            <Button className="bg-teal-600 text-white hover:bg-teal-700 px-6 py-2 rounded-xl text-lg">
              Get Started
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-100 px-6 py-2 rounded-xl text-lg">
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mt-10 w-full max-w-4xl">
        <Card className="shadow-lg rounded-2xl bg-white">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">

            {/* Optional Illustration */}
            {heroImg && (
              <img
                src={heroImg}
                alt="Expense Tracking"
                className="w-48 h-48 object-contain md:w-64 md:h-64"
              />
            )}


            <div>
              <h2 className="text-2xl font-bold text-teal-700 mb-2">Why Use WealthWize?</h2>
              <ul className="space-y-2 text-gray-700">
                <li>✔ Track your daily expenses effortlessly</li>
                <li>✔ Organize spending by categories</li>
                <li>✔ Visualize your financial habits</li>
                <li>✔ Stay in control of your money</li>
                <li>✔ Secure and easy-to-use dashboard</li>
              </ul>
            </div>

          </CardContent>
        </Card>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-3">

        {/* Feature 1 */}
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-5 text-center">
            <h3 className="text-xl font-bold text-teal-700">Add Expenses</h3>
            <Separator className="my-3" />
            <p className="text-gray-600">
              Quickly record your income and expenses with a clean interface.
            </p>
          </CardContent>
        </Card>

       
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-5 text-center">
            <h3 className="text-xl font-bold text-teal-700">Analyze Spending</h3>
            <Separator className="my-3" />
            <p className="text-gray-600">
              Understand where your money goes each month with insights.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-5 text-center">
            <h3 className="text-xl font-bold text-teal-700">Secure & Private</h3>
            <Separator className="my-3" />
            <p className="text-gray-600">
              Your personal financial data stays secure and protected.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
