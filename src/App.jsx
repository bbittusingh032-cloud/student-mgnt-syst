import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Router from "./components/Router";
import Route from "./components/Route";

import LoginPage from "./pages/LoginPage";
import StudentList from "./pages/StudentList";
import RegisterStudent from "./pages/RegisterStudent";
import UpdateRecord from "./pages/UpdateRecord";
import { toast } from "react-toastify";


// ✅ Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setCurrentPage("student-list");
      const stored = localStorage.getItem("students");
      if (stored) setStudents(JSON.parse(stored));
    }
  }, []);

  const saveStudents = (data) => {
    localStorage.setItem("students", JSON.stringify(data));
    setStudents(data);
  };

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      setCurrentPage("student-list");

      const stored = localStorage.getItem("students");
      if (stored) setStudents(JSON.parse(stored));
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now() };
    const updated = [...students, newStudent];
    saveStudents(updated);
  };

  const updateStudent = (id, updatedData) => {
    const updated = students.map((s) => (s.id === id ? { ...s, ...updatedData } : s));
    saveStudents(updated);
  };

 const deleteStudent = (id) => {
  const updated = students.filter((s) => s.id !== id);
  saveStudents(updated);

  toast.info("Student record deleted!", {
    position: "top-center",
    autoClose: 1800,
  });
};

  const filteredStudents = students.filter((s) =>
    [s.name, s.rollNo, s.email].some((field) =>
      String(field).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Router currentPage={currentPage}>
          <Route path="student-list">
            <StudentList
              students={filteredStudents}
              onDelete={deleteStudent}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setCurrentPage={setCurrentPage}
            />
          </Route>

          <Route path="register">
            <RegisterStudent onAdd={addStudent} setCurrentPage={setCurrentPage} />
          </Route>

          <Route path="update">
            <UpdateRecord students={students} onUpdate={updateStudent} />
          </Route>
        </Router>
      </main>

      <Footer />

      {/* ✅ Toast Container (Always visible for notifications) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
