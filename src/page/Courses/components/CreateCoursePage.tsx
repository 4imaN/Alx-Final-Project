import React, { useState } from "react";
import axios from "axios";
import api from "../../../api/api.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Course {
    course_code: string;
    course_name: string;
    course_credit: string;
    course_department: string;
    course_category: string;
}

const CreateCoursePage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Course>({
        course_code: "",
        course_name: "",
        course_credit: "",
        course_department: "",
        course_category: "Common",
    });

    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = Cookies.get("access_token");
        if (!token) {
            setError("No authentication token found. Please log in again.");
            setTimeout(() => {
                navigate("/");
            }, 1000);
            return;
        }

        try {
            await api.post("/course/auth/create", formData);
            console.log("Course created successfully");
            setFormData({
                course_code: "",
                course_name: "",
                course_credit: "",
                course_department: "",
                course_category: "Common",
            });
            setError("");
            setSuccessMessage("Course created successfully");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Error response data:", error.response.data);
                setError(`Error creating course: ${error.response.data.message}`);
            } else {
                setError("An unknown error occurred");
            }
            console.error("Error creating course:", error);
        }
    };

    return (
        <div className="bg-gray-100 bg-opacity-95 rounded-lg shadow-xl max-w-[75%] mx-auto mt-10 p-6">
            <h1 className="text-2xl font-bold mb-5">Create Course</h1>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="course_code"
                            className="block font-medium mb-2"
                        >
                            Course Code
                        </label>
                        <input
                            type="text"
                            id="course_code"
                            name="course_code"
                            value={formData.course_code}
                            onChange={handleInputChange}
                            placeholder="Enter course code"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="course_name"
                            className="block font-medium mb-2"
                        >
                            Course Name
                        </label>
                        <input
                            type="text"
                            id="course_name"
                            name="course_name"
                            value={formData.course_name}
                            onChange={handleInputChange}
                            placeholder="Enter course name"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="course_credit"
                            className="block font-medium mb-2"
                        >
                            Course Credit
                        </label>
                        <input
                            type="text"
                            id="course_credit"
                            name="course_credit"
                            value={formData.course_credit}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="course_department"
                            className="block font-medium mb-2"
                        >
                            Course Department
                        </label>
                        <select
                            id="course_department"
                            name="course_department"
                            value={formData.course_department}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>
                                Select department
                            </option>
                            <option value="Electrical Engineering">
                                Electrical Engineering
                            </option>
                            <option value="Computer Engineering">
                                Computer Engineering
                            </option>
                            <option value="Architectural Engineering">
                                Architectural Engineering
                            </option>
                            <option value="Civil Engineering">
                                Civil Engineering
                            </option>
                            <option value="Applied Engineering">
                                Applied Engineering
                            </option>
                            <option value="Chemical Engineering">
                                Chemical Engineering
                            </option>
                            <option value="Mining Engineering">
                                Mining Engineering
                            </option>
                            <option value="Environmental Engineering">
                                Environmental Engineering
                            </option>
                            <option value="Freshman Engineering">
                                Freshman Engineering
                            </option>
                            <option value="Industrial Engineering">
                                Industrial Engineering
                            </option>
                            <option value="STEM">STEM</option>
                            <option value="Communication Engineering">
                                Communication Engineering
                            </option>
                            <option value="Power Engineering">
                                Power Engineering
                            </option>
                            <option value="Electronics Engineering">
                                Electronics Engineering
                            </option>
                            <option value="Control Engineering">
                                Control Engineering
                            </option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="course_category"
                            className="block font-medium mb-2"
                        >
                            Course Category
                        </label>
                        <select
                            id="course_category"
                            name="course_category"
                            value={formData.course_category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        >
                            
                            <option value="Common">Common</option>
                            <option value="Major">Major</option>
                            
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    Create Course
                </button>
            </form>
        </div>
    );
};

export default CreateCoursePage;
