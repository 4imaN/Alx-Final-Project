import { SVGProps, useEffect, useState } from "react"
import api from "../api/api"
import { Link } from "react-router-dom"

const navLinks = [
    {
        name: "Announcements",
        link: "/Annou",
        icon: <RadixIconsHome />,
    },
    {
        name: "Create Instructor",
        link: "/CreateInstructor",
        icon: <RadixIconsPlusCircled />,
    },
    {
        name: "Create Student",
        link: "/CreateStudent",
        icon: <RadixIconsPlusCircled />,
    },
    
    {
        name: "Create Course",
        link: "/CreateCourse",
        icon: <RadixIconsPlusCircled />,
    },
    {
        name: "Create Room",
        link: "/CreateRoom",
        icon: <RadixIconsPlusCircled />,
    },
    // {
    //     name: "Link Student",
    //     link: "/CreateClass",
    //     icon: <RadixIconsPlusCircled />,
    // },
    // {
    //     name: "Link Instructor",
    //     link: "/LinkInstructor",
    //     icon: <RadixIconsPlusCircled />,
    // },
    {
        name: "Create Class",
        link: "/CreateClass",
        icon: <RadixIconsPlusCircled />,
    },
]

export function RadixIconsHome(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.08.222a.6.6 0 0 1 .84 0l6.75 6.64a.6.6 0 0 1-.84.856L13 6.902V12.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5V6.902l-.83.816a.6.6 0 1 1-.84-.856zm.42 1.27L12 5.918V12h-2V8.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V12H3V5.918zM7 12h2V9H7z"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}

export function RadixIconsPlusCircled(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877M1.827 7.5a5.673 5.673 0 1 1 11.346 0a5.673 5.673 0 0 1-11.346 0M7.5 4a.5.5 0 0 1 .5.5V7h2.5a.5.5 0 1 1 0 1H8v2.5a.5.5 0 0 1-1 0V8H4.5a.5.5 0 0 1 0-1H7V4.5a.5.5 0 0 1 .5-.5"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}

export function RadixIconsPerson(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.5.875a3.625 3.625 0 0 0-1.006 7.109c-1.194.145-2.218.567-2.99 1.328c-.982.967-1.479 2.408-1.479 4.288a.475.475 0 1 0 .95 0c0-1.72.453-2.88 1.196-3.612c.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 1 0 .95 0c0-1.88-.497-3.32-1.48-4.288c-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 0 0 7.5.875M4.825 4.5a2.675 2.675 0 1 1 5.35 0a2.675 2.675 0 0 1-5.35 0"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}

type User = {
    first_name: string
    middle_name: string
    last_name: string
    gender: string
    department: string
    email: string
    id: string
}

const Nav = () => {
    const [user, setUser] = useState({} as User)
    useEffect(() => {
        api.get("/admin/me").then((res: { status: number; data: User }) => {
            if (res.status === 200) {
                setUser(res.data)
            }
        })
    }, [])

    return (
        <div className=" border-b border-gray-300 p-3  bg-white drop-shadow-md">
            <div className=" w-full flex items-center justify-between px-4">
                <div className="hidden md:flex gap-5 items-center text-lg font-semibold ">
                    {navLinks.map((link) => (
                        <Link
                            to={link.link}
                            title={link.name}
                            className="hover:scale-[101%] relative gap-2 px-4 py-3 inline-flex items-center hover:bg-gray-200 rounded-lg after:[content:'attr(title)'] after:absolute after:invisible after:inset-0 after:bg-white after:text-gray-700 after:text-xs after:font-semibold after:scale-[101%]"
                            key={link.link}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </div>
                <Link
                    className="hover:scale-[101%] relative gap-2 px-4 py-3 inline-flex items-center hover:bg-gray-200 rounded-lg after:[content:'attr(title)'] after:absolute after:invisible after:inset-0 after:bg-white after:text-gray-700 after:text-xs after:font-semibold after:scale-[101%]"
                    to={"/profile"}
                >
                    <RadixIconsPerson />
                    {user.first_name}
                </Link>
            </div>
        </div>
    )
}

export default Nav
