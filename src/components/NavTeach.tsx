import { HashLink as Link } from "react-router-hash-link";


const Nav = () => {
  return (
    <div className="bg-black bg-opacity-80 border-b border-gray-700 fixed  inset-x-0 z-100 h-16  py-3 pl-4  ">
      <div className="max-w-[1400px] w-full flex items-center justify-between px-4">
        <div className="hidden md:flex gap-5 items-center text-white text-2xl font-semibold">
          <Link to="/Annou" smooth className="hover:scale-105 hover:text-blue-500">
            Announcements
          </Link>
          <Link to="/ClassRoom" smooth className="hover:scale-105 hover:text-blue-500">
            Class Rooms
          </Link>
          <Link to="/Atendance" smooth className="hover:scale-105 hover:text-blue-500">
            Students Attendance
          </Link>
          <Link to="/ProfileTeach" smooth className="hover:scale-105 hover:text-blue-500">
            Profile
          </Link>

        </div>
        <div className="flex items-center text-xl text-white gap-2"></div>
      </div>
    </div>
  );
};

export default Nav;