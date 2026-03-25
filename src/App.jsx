import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/slices/authSlice";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Profile from "./components/Profile";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, authChecked } = useSelector(
    (state) => state.auth,
  );
  const { openedComponent } = useSelector((state) => state.extra);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const renderPage = () => {
    switch (openedComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Products":
        return <Products />;
      case "Orders":
        return <Orders />;
      case "Users":
        return <Users />;
      case "Profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated && user?.role === "Admin" ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "Admin" ? (
              <div className="flex min-h-screen bg-[#f3f3f6]">
                <SideBar />
                <main className="flex-1 overflow-auto">{renderPage()}</main>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <ToastContainer theme="dark" position="top-right" />
    </Router>
  );
}

export default App;
