import React, { useState } from "react";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

interface Student {
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;
    department: string;
    email: string;
    password: string;
    student_id: string;
    batch_section: string;
}

const CreateStudent: React.FC = () => {
    const navigate = useNavigate();

    const [, setStudents] = useState<Student[]>([]);
    const [formData, setFormData] = useState<Student>({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        department: "",
        email: "",
        password: "",
        student_id: "",
        batch_section: "",
    });
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const clearFormData = () => {
        setFormData({
            first_name: "",
            middle_name: "",
            last_name: "",
            gender: "",
            department: "",
            email: "",
            password: "",
            student_id: "",
            batch_section: "",
        });
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            readDataFromFile(file).then((data) => setStudents(data));
        }
    };

    interface ExcelRow {
        [key: number]: string | number; // Assuming each cell in the row can be a string or a number
    }
    
    const readDataFromFile = async (file: File): Promise<Student[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const rows: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as ExcelRow[];
                const json: Student[] = rows.slice(1).map((row) => ({
                    first_name: row[0] as string,
                    middle_name: row[1] as string,
                    last_name: row[2] as string,
                    gender: row[3] as string,
                    department: row[4] as string,
                    email: row[5] as string,
                    password: row[6] as string,
                    student_id: row[7] as string,
                    batch_section: row[8] as string,
                }));
                resolve(json);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsArrayBuffer(file);
        });
    };
    
    const handleFormSubmission = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const token = Cookies.get("access_token");

        if (!token) {
            navigate("/");
            return;
        }

        try {
            const response = await api.post("/student/auth/register", formData);

            if (response.status === 201) {
                console.log(
                    `Student '${formData.first_name} ${formData.last_name}' registered successfully.`
                );
                clearFormData();
                setSuccessMessage(`Student '${formData.first_name} ${formData.last_name}' created successfully.`);
                setError("");
            } else {
                console.error(
                    `Error registering student '${formData.first_name} ${formData.last_name}': ${response.status} - ${response.data.message}`
                );
                setError(`Error: ${response.data.message}`);
                setSuccessMessage("");
            }
        } catch (error) {
            console.error(`Error registering student: ${error}`);
            setError("An error occurred while registering the student.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="bg-gray-100 bg-opacity-95 rounded-lg shadow-xl max-w-[75%] mx-auto mt-10 p-6">
            <h1 className="text-2xl font-bold mb-5">Create Student</h1>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <form onSubmit={handleFormSubmission}>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="first_name"
                            className="block font-medium mb-2"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            placeholder="Enter first name"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="middle_name"
                            className="block font-medium mb-2"
                        >
                            Middle Name
                        </label>
                        <input
                            type="text"
                            id="middle_name"
                            name="middle_name"
                            value={formData.middle_name}
                            onChange={handleInputChange}
                            placeholder="Enter middle name"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="last_name"
                            className="block font-medium mb-2"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            placeholder="Enter last name"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="gender"
                            className="block font-medium mb-2"
                        >
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>
                                Select gender
                            </option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="department"
                            className="block font-medium mb-2"
                        >
                            Department
                        </label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
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
                            htmlFor="email"
                            className="block font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="student_id"
                            className="block font-medium mb-2"
                        >
                            Student ID
                        </label>
                        <input
                            type="text"
                            id="student_id"
                            name="student_id"
                            value={formData.student_id}
                            onChange={handleInputChange}
                            placeholder="Enter student ID"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="batch_section"
                            className="block font-medium mb-2"
                        >
                            Batch Section
                        </label>
                        <input
                            type="text"
                            id="batch_section"
                            name="batch_section"
                            value={formData.batch_section}
                            onChange={handleInputChange}
                            placeholder="Enter batch section"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="file"
                            className="block font-medium mb-2"
                        >
                            Upload Excel
                        </label>
                        <input
                            type="file"
                            id="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Register Student
                </button>
            </form>
        </div>
    );
};

export default CreateStudent;
