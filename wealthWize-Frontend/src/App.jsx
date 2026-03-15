import { Link, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserList from "./pages/UsersList";
import Expense from "./pages/Expense";
import Categories from "./pages/Categories";

import { useDispatch } from "react-redux";
import { resetCategory, fetchUserCategories } from "./slices/categorySlice";
import { resetExpense, fetchUserExpenses } from "./slices/expenseSlice";

import logo from "./assets/expense-logo.png";

// shadcn ui
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function App() {
  const { isLoggedIn, handleLogout, user } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUserCategories());
      dispatch(fetchUserExpenses());
    }
  }, [dispatch]);
//-------------------------------------------------------------------
  const getLinks = () => {
    if (!isLoggedIn && !localStorage.getItem("token")) {
      return [
        { label: "Home", to: "/" },
        { label: "Register", to: "/register" },
        { label: "Login", to: "/login" },
      ];
    }

    let arr = [
      { label: "Account", to: "/account" },
      { label: "Dashboard", to: "/dashboard" },
      { label: "Categories", to: "/categories" },
      { label: "Expense", to: "/expense" },
    ];

    if (user?.role === "admin" || user?.role === "moderator") {
      arr.push({ label: "List Users", to: "/users-list" });
    }

    return arr;
  };

  // --------------------------------------------------------------------
  // 🔥 DESKTOP: NavigationMenu version
  // --------------------------------------------------------------------
  const renderDesktopLinks = () =>
    getLinks().map((item) => (
      <NavigationMenuItem key={item.to}>
        <NavigationMenuLink
          className="text-black bg-transparent! font-semibold hover:text-teal-700 transition"
          asChild
        >
          <Link to={item.to}>{item.label}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    ));

  // --------------------------------------------------------------------
  const renderMobileLinks = () =>
    getLinks().map((item) => (
      <Link
        key={item.to}
        className=" font-semibold text-black hover:text-teal-700 transition"
        to={item.to}
      >
        {item.label}
      </Link>
    ));

  return (
    <div className="min-h-screen bg-teal-100 text-black">
      <header className="w-full bg-teal-400 sticky top-0 z-50 ">
        <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-extrabold tracking-wide text-black">
              WealthWize
            </h1>
          </div>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4">
                {renderDesktopLinks()}

                {isLoggedIn && (
                  <NavigationMenuItem>
                    <Button
                      className="bg-black text-white hover:text-teal-600"
                      onClick={() => {
                        handleLogout();
                        dispatch(resetCategory());
                        dispatch(resetExpense());
                      }}
                    >
                      Logout
                    </Button>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-7 w-7 text-black" />
              </SheetTrigger>

              <SheetContent side="right" className="bg-teal-100">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold text-black">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-4">
                  {renderMobileLinks()}

                  {isLoggedIn && (
                    <Button
                      className=" bg-black text-white hover:text-teal-600"
                      onClick={() => {
                        handleLogout();
                        dispatch(resetCategory());
                        dispatch(resetExpense());
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* ROUTES */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users-list" element={<UserList />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
    </div>
  );
}
