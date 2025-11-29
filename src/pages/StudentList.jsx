import React from "react";
import { Users, Search } from "lucide-react";

const StudentList = ({ students, onDelete, searchTerm, setSearchTerm, setCurrentPage }) => {
  return (
    <div className="animate-fadeIn">

      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <Users className="w-7 h-7 text-[#D0006F]" />
          Student List
        </h2>

        {/* Search & Add Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, roll no, email..."
              className="pl-10 pr-4 py-2 rounded-xl border bg-white shadow focus:outline-none focus:ring-2 focus:ring-[#D0006F] w-72 transition"
            />
          </div>

          <button
            onClick={() => setCurrentPage("register")}
            className="py-2 px-4 rounded-xl bg-[#D0006F] text-white font-semibold shadow hover:bg-[#a80059] transition"
          >
            + Add Student
          </button>
        </div>
      </div>

      {/* Empty State */}
      {students.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-xl">
          <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No records found</p>

          <button
            onClick={() => setCurrentPage("register")}
            className="mt-4 bg-[#D0006F] text-white px-6 py-2 rounded-xl hover:bg-[#a80059] transition"
          >
            Add First Student
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">

          {/* Table */}
          <table className="min-w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#c12284] text-white">
                {["Roll No", "Name", "Email", "Phone", "Course", "Actions"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-pink-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.rollNo}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.course}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex gap-3">

                    {/* Copy JSON */}
                    <button
                      onClick={() => navigator.clipboard?.writeText(JSON.stringify(student))}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition text-xs"
                    >
                      Copy
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(student.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition text-xs"
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
