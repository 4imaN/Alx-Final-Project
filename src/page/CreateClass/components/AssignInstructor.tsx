import React, { useState, useEffect } from "react"; 
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

interface Student {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    department: string;
    section: string;
    batch: string;
}

interface FormData {
    instructor_id: string;
    course_id: string;
    semister: string;
    department: string;
    batch: string;
    section: string;
    student_list: string[];
}

const departments = [
    "Electrical Engineering",
    "Computer Engineering",
    "Mechanical Engineering",
    "Software Engineering",
    "Communication Engineering",
    "Power Engineering",
    "Electronics Engineering",
    "Control Engineering",
    "Civil Engineering",
    "Applied Engineering",
    "Chemical Engineering",
    "Mining Engineering",
];

const batches = [1, 2, 3, 4, 5];
const sections = ["A", "B", "C"];

const AssignInstructor: React.FC = () => {
    const navigate = useNavigate();
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [filters, setFilters] = useState({
        department: "",
        batch: "",
        section: ""
    });
    const [formData, setFormData] = useState<FormData>({
        instructor_id: "",
        course_id: "",
        semister: "",
        department: "",
        batch: "",
        section: "",
        student_list: []
    });
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    useEffect(() => {
        const fetchInstructors = async () => {
            const token = Cookies.get("access_token");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                const response = await api.get("/instructor/get-all", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data);

                if (response.status === 200) {
                    setInstructors(response.data);
                } else {
                    console.error(`Error fetching instructors: ${response.status}`);
                    setError("Error fetching instructors.");
                }
            } catch (error) {
                console.error("Error fetching instructors:", error);
                setError("An error occurred while fetching instructors.");
            }
        };

        const fetchCourses = async () => {
            const token = Cookies.get("access_token");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                const response = await api.get("/course/get-all", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.status === 200) {
                    setCourses(response.data);
                } else {
                    console.error(`Error fetching courses: ${response.status}`);
                    setError("Error fetching courses.");
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("An error occurred while fetching courses.");
            }
        };

        fetchInstructors();
        fetchCourses();
    }, [navigate]);

    useEffect(() => {
        const fetchStudents = async () => {
            const token = Cookies.get("access_token");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                // Build query parameters only if they have values
                const params = new URLSearchParams();
                if (filters.department) params.append("department", filters.department);
                if (filters.batch) params.append("batch", filters.batch);
                if (filters.batch) params.append("batch", filters.batch);
                if (filters.section) params.append("section", filters.section);

                const response = await api.get("/student/get/unlisted", {
                    headers: { Authorization: `Bearer ${token}` },
                    params
                });

                console.log("Fetch students response:", response.data);  // Added console log for debugging

                if (response.status === 200) {
                    setStudents(response.data);
                } else {
                    console.error(`Error fetching students: ${response.status}`);
                    setError("Error fetching students.");
                }
            } catch (error) {
                console.error("Error fetching students:", error);
                setError("An error occurred while fetching students.");
            }
        };

        fetchStudents();
    }, [filters, navigate]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleStudentSelection = (studentId: string) => {
        setSelectedStudents((prevSelected) =>
            prevSelected.includes(studentId)
                ? prevSelected.filter((id) => id !== studentId)
                : [...prevSelected, studentId]
        );
    };

    const handleFormSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const token = Cookies.get("access_token");

        if (!token) {
            navigate("/");
            return;
        }

        // Filter out unselected students from the student list
        const finalFormData = {
            ...formData,
            student_list: selectedStudents
        };

        try {
            const response = await api.post("/instructor/auth/create-class", finalFormData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);

            if (response.status === 200) {
                console.log("Class created successfully");
                clearFormData();
                setSuccessMessage("Class created successfully.");
                setError("");

            } else {
                console.error(`Error creating class: ${response.status} - ${response.data.error}`);
                setError(`Error: ${response.data.error}`);
                setSuccessMessage("");
            }
        } catch (error) {
            console.error(`Error creating class: ${error}`);
            setError("An error occurred while creating the class.");
            setSuccessMessage("");
        }
    };

    const clearFormData = () => {
        setFormData({
            instructor_id: "",
            course_id: "",
            semister: "",
            department: "",
            batch: "",
            section: "",
            student_list: []
        });
        setSelectedStudents([]);
    };

    return (
        <div className="bg-gray-100 bg-opacity-95 rounded-lg shadow-xl max-w-[75%] mx-auto mt-10 p-6">
            <h1 className="text-2xl font-bold mb-5">Assign Students to Instructor</h1>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <form onSubmit={handleFormSubmission}>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="instructor_id" className="block font-medium mb-2">
                            Instructor
                        </label>
                        <select
                            id="instructor_id"
                            name="instructor_id"
                            value={formData.instructor_id}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>
                                Select Instructor
                            </option>
                            {instructors.map((instructor: any) => (
                                <option key={instructor.teacher_id} value={instructor.teacher_id}>
                                    {instructor.first_name} {instructor.middle_name} {instructor.last_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="course_id" className="block font-medium mb-2">
                            Course
                        </label>
                        <select
                            id="course_id"
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>
                                Select Course
                            </option>
                            {courses.map((course: any) => (
                                <option key={course.id} value={course.id}>
                                    {course.course_name} ({course.course_code})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="semister" className="block font-medium mb-2">
                            Semester
                        </label>
                        <input
                            type="text"
                            id="semister"
                            name="semister"
                            value={formData.semister}
                            onChange={handleInputChange}
                            placeholder="Enter semester"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="department" className="block font-medium mb-2">
                            Department
                        </label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>
                                Select Department
                            </option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="batch" className="block font-medium mb-2">
                            Batch
                        </label>
                        <select
                            id="batch"
                            name="batch"
                            value={formData.batch}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>
                                Select Batch
                            </option>
                            {batches.map((batch) => (
                                <option key={batch} value={batch}>
                                    {batch}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="section" className="block font-medium mb-2">
                            Section
                        </label>
                        <select
                            id="section"
                            name="section"
                            value={formData.section}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>
                                Select Section
                            </option>
                            {sections.map((section) => (
                                <option key={section} value={section}>
                                    {section}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-lg font-medium mb-4">Filter Students</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="filter-department" className="block font-medium mb-2">
                                Department
                            </label>
                            <select
                                id="filter-department"
                                name="department"
                                value={filters.department}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select Department
                                </option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter-batch" className="block font-medium mb-2">
                                Batch
                            </label>
                            <select
                                id="filter-batch"
                                name="batch"
                                value={filters.batch}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select Batch
                                </option>
                                {batches.map((batch) => (
                                    <option key={batch} value={batch}>
                                        {batch}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter-section" className="block font-medium mb-2">
                                Section
                            </label>
                            <select
                                id="filter-section"
                                name="section"
                                value={filters.section}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select Section
                                </option>
                                {sections.map((section) => (
                                    <option key={section} value={section}>
                                        {section}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-lg font-medium mb-4">Select Students</h2>
                    <div className="max-h-64 overflow-y-auto border rounded-md p-4">
                        {students.map((student) => (
                            <div key={student.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={`student-${student.id}`}
                                    checked={selectedStudents.includes(student.id)}
                                    onChange={() => handleStudentSelection(student.id)}
                                    className="mr-2"
                                />
                                <label htmlFor={`student-${student.id}`}>
                                    {student.first_name} {student.middle_name} {student.last_name} - {student.email} ({student.department})
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Assign Students
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AssignInstructor;

