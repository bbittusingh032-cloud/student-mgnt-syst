import React, { useState } from "react";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";

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
      setErrors({
        ...errors,
        [name]: validateName(filteredValue) || (filteredValue !== value ? "Numbers are not allowed in name" : ""),
      });
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
  const newErrors = {
    rollNo: validateRollNo(formData.rollNo),
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone),
  };

  if (!formData.course) newErrors.course = "Course is required";

  setErrors(newErrors);

  const hasErrors = Object.values(newErrors).some(
    (e) => e && e.length > 0
  );

  if (hasErrors) {
    toast.error("Please fix the errors!", {
      position: "top-center",
      autoClose: 2000,
    });
    return;
  }

  // ADD STUDENT
  onAdd(formData);

  // RESET FORM
  setFormData({
    rollNo: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    address: "",
  });

  setErrors({});

  // SUCCESS TOAST
  toast.success("Student registered successfully!", {
    position: "top-center",
    autoClose: 2000,
  });

  setCurrentPage("student-list");
};



  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <UserPlus className="w-8 h-8 text-[#D0006F]" />
        <h2 className="text-3xl font-extrabold text-gray-800">Register New Student</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number *</label>
            <input
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0006F] ${errors.rollNo ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.rollNo && <p className="text-xs text-red-500 mt-1">{errors.rollNo}</p>}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className={`w-full px-3 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0006F] ${errors.name ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="e.g., student@gmail.com"
              className={`w-full px-3 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0006F] ${errors.email ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="e.g., 9876543210"
              maxLength="10"
              className={`w-full px-3 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0006F] ${errors.phone ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0006F] border-gray-300"
            >
              <option value="">Select Course</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>BCA</option>
              <option>MBA</option>
              <option>BBA</option>
            </select>
            {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D0006F] border-gray-300"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-[#D0006F] to-pink-600 text-white rounded-2xl font-semibold shadow hover:from-[#a80059] hover:to-pink-700 transition transform hover:scale-105 active:scale-95"
          >
            Register Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
