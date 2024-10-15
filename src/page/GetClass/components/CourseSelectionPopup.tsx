import React, { useState, useEffect } from "react";
import api from "../../../api/api";

interface Course {
  course_category: string;
  course_code: string;
  course_credit: string;
  course_department: string;
  course_name: string;
}

interface CourseSelectionPopupProps {
  studentIds: Set<string>
  selectedSemester: string
  onClose: () => void;
}

const CourseSelectionPopup: React.FC<CourseSelectionPopupProps> = ({ onClose, studentIds, selectedSemester }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        let url = "/course/get-all";
        const params = new URLSearchParams();
        if (selectedDepartment) params.append("department", selectedDepartment);
        if (selectedCategory) params.append("category", selectedCategory);
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await api.get<Course[]>(url);
        // Sort the courses based on category
        response.data.sort((a, b) => {
          if (a.course_category < b.course_category) return -1;
          if (a.course_category > b.course_category) return 1;
          return 0;
        });
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedDepartment, selectedCategory]);

  const handleCourseSelection = (courseCode: string) => {
    const index = selectedCourses.indexOf(courseCode);
    if (index === -1) {
      setSelectedCourses([...selectedCourses, courseCode]);
    } else {
      const updatedSelection = [...selectedCourses];
      updatedSelection.splice(index, 1);
      setSelectedCourses(updatedSelection);
    }
  };

  const handleSubmit = async () => {
    try {
      // Submit selected courses to the backend
      const response = await api.post("/instructor/auth/create-class", { courses: selectedCourses , semister: selectedSemester, student_list: Array.from(studentIds) });
      console.log("Submission response:", response.data);
      // Close the popup after submission
      onClose();
    } catch (error) {
      console.error("Error submitting courses:", error);
      setError("Error submitting courses");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center ">
      <div className=" bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto">
        <button 
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Select Courses</h2>
        <div className="mb-4">
          <label htmlFor="department" className="mr-2">
            Select Department:
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="mr-4"
          >
            <option value="">All Departments</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Computer Engineering">Computer Engineering</option>
            {/* Add other departments here */}
          </select>

          <label htmlFor="category" className="mr-2">
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="common">Common</option>
            <option value="major">Major</option>
            {/* Add other categories here */}
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {courses.map((course) => (
                <div key={course.course_code} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <input
                    type="checkbox"
                    id={course.course_code}
                    checked={selectedCourses.includes(course.course_code)}
                    onChange={() => handleCourseSelection(course.course_code)}
                  />
                  <label htmlFor={course.course_code} className="ml-2">{course.course_name}</label>
                  <p>Category: {course.course_category}</p>
                  <p>Department: {course.course_department}</p>
                  <p>Credit: {course.course_credit}</p>
                  <p>Code: {course.course_code}</p>
                </div>
              ))}
            </div>
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Submit
            </button>
          </>
        )}
      </div>
    </div>  
  );
};

export default CourseSelectionPopup;
