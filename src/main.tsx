import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./page/Hero/Hero";
import Profile from "./page/Profile/Profile";
import Course from "./page/Courses/Course";
import Room from "./page/CreateRoom/Room";
import AuthProvider from "./components/AuthProvider";
import AdminLogin from "./page/adminLogin/adminLogin";
import CreateInstructor from "./page/createInstructor/createInstructor";
import Student from "./page/CreateStudent/Student";
import GetClass from "./page/GetClass/GetClass";
import LinkInstructor from "./page/LinkInstructor/LinkInstructor.tsx";
import CreateClass from "./page/CreateClass/CreateClass.tsx";  

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLogin />,
    },
    {
        path: "/Annou",
        element: <Hero />,
    },
    {
        path: "/Profile",
        element: <Profile />,
    },
    {
        path: "/CreateCourse",
        element: <Course />,
    },
    {
        path: "/CreateRoom",
        element: <Room />,
    },
    {
        path: "/CreateInstructor",
        element: <CreateInstructor />,
    },
    {
        path: "/CreateStudent",
        element: <Student />,
    },
    {
        path: "/GetClass",  
        element: <GetClass />,
    },
    {
        path: "/LinkInstructor",
        element: <LinkInstructor />,
    },
    {
        path: "/CreateClass",
        element: <CreateClass />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider isSignedIn={false}>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
    
