import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListOrdered,
  Package,
  Users,
  User,
  LogOut,
  Menu,
  MoveLeft,
} from "lucide-react";
import { setOpenedComponent, toggleNavbar } from "../store/slices/extraSlice";
import { logoutUser } from "../store/slices/authSlice";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Products", icon: Package },
  { label: "Orders", icon: ListOrdered },
  { label: "Users", icon: Users },
  { label: "Profile", icon: User },
];

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openedComponent, isNavbarOpened } = useSelector((s) => s.extra);
  const { user } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <aside
      className={`${isNavbarOpened ? "w-64" : "w-20"} min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 flex-shrink-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {isNavbarOpened && <span className="font-bold text-lg">Admin</span>}
        <button
          onClick={() => dispatch(toggleNavbar())}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors ml-auto"
        >
          {isNavbarOpened ? (
            <MoveLeft className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* User info */}
      {isNavbarOpened && (
        <div className="p-4 border-b border-slate-700">
          <p className="font-semibold text-sm truncate">{user?.name}</p>
          <p className="text-xs text-slate-400 truncate">{user?.email}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => dispatch(setOpenedComponent(label))}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
              openedComponent === label
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {isNavbarOpened && (
              <span className="text-sm font-medium">{label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isNavbarOpened && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
