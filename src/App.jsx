import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Users, Edit, LogOut, LogIn } from 'lucide-react';

// Simple Router Component
const Router = ({ children, currentPage }) => {
  return React.Children.toArray(children).find(child => child.props.path === currentPage);
};

const Route = ({ children }) => children;

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setCurrentPage('student-list');
      loadStudents();
    }
  }, []);

  const loadStudents = () => {
    const stored = localStorage.getItem('students');
    if (stored) {
      setStudents(JSON.parse(stored));
    }
  };

  const saveStudents = (data) => {
    localStorage.setItem('students', JSON.stringify(data));
    setStudents(data);
  };

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setCurrentPage('student-list');
      loadStudents();
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now() };
    const updated = [...students, newStudent];
    saveStudents(updated);
  };

  const updateStudent = (id, updatedData) => {
    const updated = students.map(s => s.id === id ? { ...s, ...updatedData } : s);
    saveStudents(updated);
  };

  const deleteStudent = (id) => {
    const updated = students.filter(s => s.id !== id);
    saveStudents(updated);
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

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
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid credentials. Use admin/admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <div className="flex justify-center mb-6">
          <LogIn className="w-16 h-16 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Student Management System</h2>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Login
          </button>
        </div>
        <p className="text-gray-600 text-xs text-center mt-4">Default: admin / admin123</p>
      </div>
    </div>
  );
};

const Navbar = ({ currentPage, setCurrentPage, onLogout }) => {
  const navItems = [
    { name: 'Student List', path: 'student-list', icon: Users },
    { name: 'Register Student', path: 'register', icon: UserPlus },
    { name: 'Update Record', path: 'update', icon: Edit },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">IIMT StudentPortal</h1>
          <div className="flex space-x-1">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => setCurrentPage(item.path)}
                className={`flex items-center px-4 py-2 rounded-lg transition duration-200 ${
                  currentPage === item.path
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'hover:bg-blue-700'
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </button>
            ))}
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const StudentList = ({ students, onDelete, searchTerm, setSearchTerm, setCurrentPage }) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Student List</h2>
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, roll no, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No students found</p>
          <button
            onClick={() => setCurrentPage('register')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add First Student
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{student.rollNo}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.course}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => onDelete(student.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const RegisterStudent = ({ onAdd, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    email: '',
    phone: '',
    course: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) {
      return 'Name is required';
    }
    if (!nameRegex.test(name)) {
      return 'Name should only contain letters and spaces';
    }
    if (name.trim().length < 2) {
      return 'Name should be at least 2 characters';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid 10-digit Indian mobile number';
    }
    return '';
  };

  const validateRollNo = (rollNo) => {
    const rollNoRegex = /^[A-Z0-9]{4,15}$/;
    if (!rollNo.trim()) {
      return 'Roll number is required';
    }
    if (!rollNoRegex.test(rollNo.toUpperCase())) {
      return 'Roll number should be 4-15 characters (letters and numbers only)';
    }
    return '';
  };

  const handleSubmit = () => {
    const newErrors = {};
    
    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);

    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll number is required';
    if (!formData.course) newErrors.course = 'Course is required';

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (!hasErrors) {
      onAdd(formData);
      setFormData({ rollNo: '', name: '', email: '', phone: '', course: '', address: '' });
      setErrors({});
      alert('Student registered successfully!');
      setCurrentPage('student-list');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      const filteredValue = value.replace(/[0-9]/g, '');
      setFormData({ ...formData, [name]: filteredValue });
      if (filteredValue !== value) {
        setErrors({ ...errors, [name]: 'Numbers are not allowed in name' });
      } else {
        setErrors({ ...errors, [name]: validateName(filteredValue) });
      }
    } else if (name === 'phone') {
      const filteredValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: filteredValue });
      setErrors({ ...errors, [name]: validatePhone(filteredValue) });
    } else if (name === 'email') {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: validateEmail(value) });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Register New Student</h2>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Roll Number *</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.rollNo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.rollNo && <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., student@gmail.com"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., 9876543210"
              maxLength="10"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Course *</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Register Student
        </button>
      </div>
    </div>
  );
};

const UpdateRecord = ({ students, onUpdate }) => {
  const [selectedId, setSelectedId] = useState('');
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    email: '',
    phone: '',
    course: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) {
      return 'Name is required';
    }
    if (!nameRegex.test(name)) {
      return 'Name should only contain letters and spaces';
    }
    if (name.trim().length < 2) {
      return 'Name should be at least 2 characters';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid 10-digit Indian mobile number';
    }
    return '';
  };

  const handleStudentSelect = (e) => {
    const id = parseInt(e.target.value);
    setSelectedId(id);
    const student = students.find(s => s.id === id);
    if (student) {
      setFormData(student);
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      const filteredValue = value.replace(/[0-9]/g, '');
      setFormData({ ...formData, [name]: filteredValue });
      if (filteredValue !== value) {
        setErrors({ ...errors, [name]: 'Numbers are not allowed in name' });
      } else {
        setErrors({ ...errors, [name]: validateName(filteredValue) });
      }
    } else if (name === 'phone') {
      const filteredValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: filteredValue });
      setErrors({ ...errors, [name]: validatePhone(filteredValue) });
    } else if (name === 'email') {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: validateEmail(value) });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    
    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);

    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll number is required';
    if (!formData.course) newErrors.course = 'Course is required';

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (!hasErrors) {
      onUpdate(selectedId, formData);
      alert('Student record updated successfully!');
      setSelectedId('');
      setFormData({ rollNo: '', name: '', email: '', phone: '', course: '', address: '' });
      setErrors({});
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Update Student Record</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Student</label>
          <select
            value={selectedId}
            onChange={handleStudentSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a student...</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.rollNo} - {s.name}
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
          <div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Roll Number</label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.rollNo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.rollNo && <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., John Doe"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., student@gmail.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., 9876543210"
                  maxLength="10"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
            >
              Update Record
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Student Management System</h3>
            <p className="text-gray-400 text-sm">© 2024 All Rights Reserved</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition duration-200">About</a>
            <a href="#" className="hover:text-blue-400 transition duration-200">Contact</a>
            <a href="#" className="hover:text-blue-400 transition duration-200">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;