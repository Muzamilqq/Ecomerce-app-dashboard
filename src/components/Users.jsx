import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../store/slices/adminSlice";
import { LoaderCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./Header";
import avatar from "../assets/avatar.jpg";

const Users = () => {
  const dispatch = useDispatch();
  const { users, totalUsers, loading } = useSelector((s) => s.admin);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllUsers(page));
  }, [dispatch, page]);

  return (
    <div className="min-h-screen bg-[#f3f3f6]">
      <Header title="Users" />
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <LoaderCircle className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["User", "Email", "Role", "Joined", "Delete"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar?.url || avatar}
                            alt={u.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-medium text-gray-800">
                            {u.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{u.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            u.role === "Admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => dispatch(deleteUser(u.id))}
                          className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-400"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>Total: {totalUsers} users</span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">
              {page}
            </span>
            <button
              disabled={users.length < 10}
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
