import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import api from "../../api/api";

const AdminLogin = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        api.get("/admin/me").then((res: { status: number }) => {
            if (res.status === 200) {
                setSuccess(true);
                navigate("/Annou");
            }
        });
    }, [navigate]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const response: AxiosResponse = await axios.post(
                "http://54.197.44.144/admin/auth/login",
                JSON.stringify({ email: user, password: pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            console.log(response);
            const token = response.data.access_token;
            Cookies.set("access_token", token);
            setSuccess(true);
            navigate("/Annou");
        } catch (err) {
            console.log(err);
            if (!err || !(err as AxiosError).response) {
                setErrMsg("No Server Response");
            } else if ((err as AxiosError).response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if ((err as AxiosError).response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }

            if (errRef.current) {
                errRef.current.focus();
            }
        }
        setIsProcessing(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md font-bold">
                Admin Login
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="username"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center ${isProcessing ? 'cursor-not-allowed' : ''}`}
                            type="submit"
                            disabled={isProcessing}
                        >
                            {isProcessing && (
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                            )}
                            Sign In
                        </button>
                    </div>
                </form>
                {errMsg && (
                    <p
                        ref={errRef}
                        className="text-red-500 font-bold mt-4"
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                )}
                {success && (
                    <p
                        className="text-green-500 font-bold mt-4"
                        aria-live="assertive"
                    >
                        Login successful!
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
