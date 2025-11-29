import React from "react";
import { Users, Search } from "lucide-react";

const StudentList = ({ students, onDelete, searchTerm, setSearchTerm, setCurrentPage }) => {
  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Student List</h2>
          <p className="text-sm text-gray-500 mt-1">Manage student records quickly</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, roll no, or email..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
            />
          </div>

          <button
            onClick={() => setCurrentPage("register")}
            className="py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 transition"
          >
            Add Student
          </button>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No students found</p>
          <button
            onClick={() => setCurrentPage("register")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add First Student
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
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
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{student.rollNo}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.course}</td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button
                      onClick={() => navigator.clipboard?.writeText(JSON.stringify(student))}
                      className="px-3 py-1 bg-yellow-400 rounded text-white text-sm hover:brightness-95"
                      title="Copy JSON"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="px-3 py-1 bg-red-500 rounded text-white text-sm hover:bg-red-600"
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

export default StudentList;
