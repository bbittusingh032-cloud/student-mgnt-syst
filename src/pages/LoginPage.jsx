import React, { useState } from "react";
import { LogIn } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const success = onLogin(username.trim(), password);
    if (!success) {
      setError("Invalid credentials. Use admin / admin123");
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#D0006F] bg-gradient-to-br from-[#D0006F] to-pink-700">
      {/* scoped animation */}
      <style>{`
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(10px) scale(.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20"
        style={{ animation: "fadeSlide .4s ease" }}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#D0006F] p-3 rounded-full shadow-lg mb-3">
            <LogIn className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-[#D0006F] tracking-wide">
            IIMT College
          </h1>
          <p className="text-xs text-gray-600">Student Management System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              autoFocus
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D0006F] outline-none"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D0006F] outline-none"
              placeholder="admin123"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-[#D0006F] hover:bg-pink-800 text-white rounded-lg font-semibold transition shadow-md"
          >
            Login
          </button>

          <p className="text-center text-xs text-gray-500">
            Default: admin / admin123
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
