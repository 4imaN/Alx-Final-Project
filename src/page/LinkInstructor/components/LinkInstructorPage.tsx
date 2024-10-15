import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import CourseSelectionPopup from "./CourseSelectionPopup";

interface Instructor {
  teacher_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  department: string;
  qualification: string;
  courses: Course[];
}

interface Course {
  code: string;
  name: string;
  credit: string;
}

const LinkInstructorPage: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
  const [isCoursePopupOpen, setIsCoursePopupOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const response = await api.get<Instructor[]>("/instructor/get-all");
        setInstructors(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching instructors");
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);
  useEffect(()=>{
    console.log(instructors)
  },[instructors])

  const handleInstructorSelect = (instructorId: string) => {
    console.log(instructorId)
    setSelectedInstructor(instructorId);
    setIsCoursePopupOpen(true);
  };

  const handleCourseSubmit = async (selectedCourses: string[]) => {
      
      console.log(selectedInstructor, "Fn start");
      if (!selectedInstructor) return;

    try {
      await api.post("/instructor/attach/course", {
        instructor_id: selectedInstructor,
        course_id: selectedCourses
      });
      alert("Courses linked successfully");
      setSelectedInstructor(null);
      setIsCoursePopupOpen(false);
    } catch (error) {
      console.error("Error linking courses:", error);
      alert("Error linking courses");
    }
  };

  return (
    <div className="bg-gray-100 bg-opacity-95 rounded-lg shadow-xl max-w-[75%] mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-5">Link Instructor to Courses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {instructors.map((instructor) => (
            <div className="max-h-[150px] overflow-hidden bg-white p-4 rounded-lg shadow-md " key={instructor.teacher_id}>
                <div className=" overflow-auto">
                  <p>{`${instructor.first_name} ${instructor.middle_name} ${instructor.last_name}`}</p>
                  <button
                    onClick={() => handleInstructorSelect(instructor.teacher_id)}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                  >
                    Link Courses
                  </button>
                </div>
                <div>
                    {
                        instructor.courses.map((course) => (
                            <div key={course.code} className="text-sm text-gray-500 font-medium">
                                {course.name}
                            </div>
                        ))
                    }
                </div>
            </div>  
          ))}
        </div>
      )}
      {isCoursePopupOpen && (
        <CourseSelectionPopup onClose={() => setIsCoursePopupOpen(false)} onSubmit={handleCourseSubmit} />
      )}
    </div>
  );
};

export default LinkInstructorPage;
