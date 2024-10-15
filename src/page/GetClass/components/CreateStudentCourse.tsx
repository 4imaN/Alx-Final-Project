import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import CourseSelectionPopup from "./CourseSelectionPopup"; // Adjust the path as necessary

interface Student {
  id: string;
  first_name: string;
  email: string;
  age: number;
  gender: string;
  department: string;
  batch: string;
  section: string;
}

const StudentListPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState<boolean>(false);

  

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        let url = "/student/get/unlisted";
        const params = new URLSearchParams();
        if (selectedBatch) params.append("batch", selectedBatch);
        if (selectedSection) params.append("section", selectedSection);
        if (selectedDepartment) params.append("department", selectedDepartment);
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await api.get<Student[]>(url);
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching students");
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedBatch, selectedSection, selectedDepartment]);

  const handleCheckboxChange = (id: string) => {
    setSelectedStudents((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      
      
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectedStudents.size === students.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(students.map((student) => student.id)));
    }
  };

  const handleSubmit = async () => {
    setShowPopup(true);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white bg-opacity-95 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <div className="mb-4">
        <label htmlFor="batch" className="mr-2">
          Select Batch:
        </label>
        <select
          id="batch"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="mr-4 border-solid border-2 border-gray-500 shadow-2xl focus:shadow-outline"
        >
          <option value="">Select Batch</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="section" className="mr-2">
          Select Section:
        </label>
        <select
          id="section"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="mr-4 border-solid border-2 border-gray-500"
        >
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <label htmlFor="Semester" className="mr-2">
          Select Semester:
        </label>
        <select
          id="Semester"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="mr-4 border-solid border-2 border-gray-500"
        >
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <label htmlFor="department" className="mr-2 ">
          Select Department:
        </label>
        <select
          id="department"
          className="border-solid border-2 border-gray-500 shadow-2xl focus:shadow-outline"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Architectural Engineering">Architectural Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Applied Engineering">Applied Engineering</option>
          <option value="Chemical Engineering">Chemical Engineering</option>
          <option value="Mining Engineering">Mining Engineering</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={handleSelectAll}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {selectedStudents.size === students.length ? "Deselect All" : "Select All"}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Select</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Age</th>
                  <th className="px-4 py-2 border">Gender</th>
                  <th className="px-4 py-2 border">Department</th>
                  <th className="px-4 py-2 border">Batch</th>
                  <th className="px-4 py-2 border">Section</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedStudents.has(student.id)}
                        onChange={() => handleCheckboxChange(student.id)}
                      />
                    </td>
                    <td className="px-4 py-2 border">{student.first_name}</td>
                    <td className="px-4 py-2 border">{student.email}</td>
                    <td className="px-4 py-2 border">{student.age}</td>
                    <td className="px-4 py-2 border">{student.gender}</td>
                    <td className="px-4 py-2 border">{student.department}</td>
                    <td className="px-4 py-2 border">{student.batch}</td>
                    <td className="px-4 py-2 border">{student.section}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </>
      )}

      {showPopup && <CourseSelectionPopup studentIds={selectedStudents} selectedSemester={selectedSemester} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default StudentListPage;