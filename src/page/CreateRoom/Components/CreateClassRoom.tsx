import React, { useState } from "react";
import axios from "axios";
import api from "../../../api/api.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Classroom {
    block_no: string;
    room_no: string;
}

const CreateClassroomPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Classroom>({
        block_no: "",
        room_no: "",
    });

    const [error, setError] = useState<string>("");

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
            await api.post("/room/auth/create", formData);
            console.log("Classroom created successfully");
            setFormData({
                block_no: "",
                room_no: "",
            });
            setError("");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Error response data:", error.response.data);
                setError(`Error creating classroom: ${error.response.data.message}`);
            } else {
                setError("An unknown error occurred");
            }
            console.error("Error creating classroom:", error);
        }
    };

    return (
        <div className="bg-gray-100 bg-opacity-95 rounded-lg shadow-xl max-w-[75%] mx-auto mt-10 p-6">
            <h1 className="text-2xl font-bold mb-5">Create Room</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="block_no"
                            className="block font-medium mb-2"
                        >
                            Block No
                        </label>
                        <input
                            type="text"
                            id="block_no"
                            name="block_no"
                            value={formData.block_no}
                            onChange={handleInputChange}
                            placeholder="Enter block number"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="room_no"
                            className="block font-medium mb-2"
                        >
                            Room No
                        </label>
                        <input
                            type="text"
                            id="room_no"
                            name="room_no"
                            value={formData.room_no}
                            onChange={handleInputChange}
                            placeholder="Enter room number"
                            className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    Create Classroom
                </button>
            </form>
        </div>
    );
};

export default CreateClassroomPage;
