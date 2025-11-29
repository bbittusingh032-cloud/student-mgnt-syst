import React, { useState } from "react";

const RegisterStudent = ({ onAdd, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) return "Name is required";
    if (!nameRegex.test(name)) return "Name should only contain letters and spaces";
    if (name.trim().length < 2) return "Name should be at least 2 characters";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Please enter a valid 10-digit Indian mobile number";
    return "";
  };

  const validateRollNo = (rollNo) => {
    const rollNoRegex = /^[A-Z0-9]{4,15}$/i;
    if (!rollNo.trim()) return "Roll number is required";
    if (!rollNoRegex.test(rollNo)) return "Roll number should be 4-15 characters (letters and numbers only)";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const filteredValue = value.replace(/[0-9]/g, "");
      setFormData({ ...formData, [name]: filteredValue });
      setErrors({ ...errors, [name]: validateName(filteredValue) || (filteredValue !== value ? "Numbers are not allowed in name" : "") });
      return;
    }

    if (name === "phone") {
      const filteredValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: filteredValue });
      setErrors({ ...errors, [name]: validatePhone(filteredValue) });
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    const newErrors = {};
    newErrors.rollNo = validateRollNo(formData.rollNo);
    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);
    if (!formData.course) newErrors.course = "Course is required";

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((e) => e && e.length > 0);

    if (!hasErrors) {
      onAdd(formData);
      setFormData({ rollNo: "", name: "", email: "", phone: "", course: "", address: "" });
      setErrors({});
      alert("Student registered successfully!");
      setCurrentPage("student-list");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Register New Student</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number *</label>
            <input name="rollNo" value={formData.rollNo} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.rollNo ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            {errors.rollNo && <p className="text-xs text-red-500 mt-1">{errors.rollNo}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g., John Doe" className={`w-full px-3 py-2 border rounded ${errors.name ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="e.g., student@gmail.com" className={`w-full px-3 py-2 border rounded ${errors.email ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="e.g., 9876543210" maxLength="10" className={`w-full px-3 py-2 border rounded ${errors.phone ? "border-red-400" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
            <select name="course" value={formData.course} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Course</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Civil</option>
            </select>
            {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="mt-6">
          <button onClick={handleSubmit} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 transition">
            Register Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
