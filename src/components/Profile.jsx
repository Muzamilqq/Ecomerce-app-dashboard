import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  updatePassword,
  logoutUser,
} from "../store/slices/authSlice";
import Header from "./Header";
import avatar from "../assets/avatar.jpg";
import { LoaderCircle, Upload, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isUpdatingProfile, isUpdatingPassword } = useSelector(
    (s) => s.auth,
  );
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    if (avatarFile) fd.append("avatar", avatarFile);
    dispatch(updateProfile(fd));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updatePassword({ currentPassword, newPassword, confirmNewPassword }),
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f3f3f6]">
      <Header title="Profile" />
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Profile Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user?.avatar?.url || avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">{user?.name}</h2>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          </div>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Avatar
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
            </div>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium disabled:opacity-60"
            >
              {isUpdatingProfile ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              Update Profile
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-800 mb-4">
            Change Password
          </h3>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            {[
              ["Current Password", currentPassword, setCurrentPassword],
              ["New Password", newPassword, setNewPassword],
              [
                "Confirm New Password",
                confirmNewPassword,
                setConfirmNewPassword,
              ],
            ].map(([label, val, setter]) => (
              <div key={label}>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {label}
                </label>
                <input
                  type="password"
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium disabled:opacity-60"
            >
              {isUpdatingPassword ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : null}
              Update Password
            </button>
          </form>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium w-full justify-center border border-red-200"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
