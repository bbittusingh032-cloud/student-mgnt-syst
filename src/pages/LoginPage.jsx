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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      {/* component-scoped keyframes */}
      <style>{`
        @keyframes popIn {
          0% { transform: translateY(-8px) scale(.98); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6" style={{ animation: "popIn .45s ease" }}>
        <div className="flex flex-col items-center mb-4">
          <LogIn className="w-16 h-16 text-blue-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">IIMT College</h1>
          <p className="text-sm text-gray-500 -mt-1">Student Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              autoFocus
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin123"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
          >
            Login
          </button>

          <p className="text-center text-xs text-gray-500">Default: admin / admin123</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
