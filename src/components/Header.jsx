import { useDispatch, useSelector } from "react-redux";
import { Menu } from "lucide-react";
import { toggleNavbar } from "../store/slices/extraSlice";
import avatar from "../assets/avatar.jpg";

const Header = ({ title }) => {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(toggleNavbar())}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-700">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.role}</p>
        </div>
        <img
          src={user?.avatar?.url || avatar}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover border-2 border-blue-200"
        />
      </div>
    </div>
  );
};

export default Header;
