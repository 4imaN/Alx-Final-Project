import React, { useState } from "react"
import axios from "axios"
import api from "../../../api/api.js"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

interface Instructor {
    first_name: string
    middle_name: string
    last_name: string
    gender: string
    department: string
    email: string
    password: string
    teacher_id: string
    qualification: string
}

const CreateInstructorPage: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Instructor>({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        department: "",
        email: "",
        password: "",
        teacher_id: "",
        qualification: "",
    })

    const [error, setError] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSuccessMessage("Instructor created successfully")

        const token = Cookies.get("access_token")
        if (!token) {
            setError("No authentication token found. Please log in again.")
            setTimeout(() => {
                navigate("/")
            }, 1000)
            return
        }

        try {
            await api.post("/instructor/auth/register", formData)
            console.log("Instructor created successfully")
            setFormData({
                first_name: "",
                middle_name: "",
                last_name: "",
                gender: "",
                department: "",
                email: "",
                password: "",
                teacher_id: "",
                qualification: "",
            })
            setError("")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Error response data:", error.response.data)
                setError(
                    `Error creating instructor: ${error.response.data.message}`
                )
            } else {
                setError("An unknown error occurred")
            }
            console.error("Error creating instructor:", error)
        }
    }

    return (
        <div className="bg-gray-100 bg-opacity-95 rounded-lg shadow-xl max-w-[75%] mx-auto mt-10 p-6">
            <h1 className="text-2xl font-bold mb-5">Create Instructor</h1>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                            htmlFor="teacher_id"
                            className="block font-medium mb-2"
                        >
                            Teacher ID
                        </label>
                        <input
                            type="text"
                            id="teacher_id"
                            name="teacher_id"
                            value={formData.teacher_id}
                            onChange={handleInputChange}
                            placeholder="Enter teacher ID"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="qualification"
                            className="block font-medium mb-2"
                        >
                            Qualification
                        </label>
                        <select
                            id="qualification"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>
                                Select qualification
                            </option>
                            <option value="PhD">PhD</option>
                            <option value="BSc">BSc</option>
                            <option value="Masters">Masters</option>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    Create Instructor
                </button>
            </form>
        </div>
    )
}

export default CreateInstructorPage
