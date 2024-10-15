import { useEffect, useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type ProfileData = {
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;
    department: string;
    email: string;
    id: string;
};

const ProfileData = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get<ProfileData>("/admin/me").then((response) => {
            setProfileData(response.data);
        });
    }, []);

    const handleLogout = () => {
        Cookies.remove("access_token");
        navigate("/");
    };

    if (!profileData) {
        navigate("/");
        return null;
    }

    return (
        <div
            id="Profile"
            className="pt-20 flex flex-col items-center"
        >
            <div
                className="bg-white-4000 shadow-xl rounded-lg p-6 w-full max-w-md"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }} // Semi-transparent background
            >
                <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                <p className="mb-2 font">
                    <strong>Name:</strong> {profileData.first_name} {profileData.last_name}
                </p>
                <p className="mb-2">
                    <strong>Gender:</strong> {profileData.gender}
                </p>
                <p className="mb-2">
                    <strong>Email:</strong> {profileData.email}
                </p>
                <p className="mb-4">
                    <strong>Department:</strong> {profileData.department}
                </p>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileData;
