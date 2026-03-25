import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, LoaderCircle } from "lucide-react";

const ForgotPassword = () => {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated && user?.role === "Admin")
    return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `https://ecomerce-app-backend.vercel.app/api/v1/auth/password/forgot?frontendUrl=${window.location.origin}`,
        { email },
        { withCredentials: true },
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email and we'll send a reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin" /> Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
