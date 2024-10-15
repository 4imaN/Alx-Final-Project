import bg from "../../assets/appBg.png";
import Nav from "../../components/Nav";
import CreateStudentCourse from "./components/CreateStudentCourse.tsx";

const Course = () => {
  return (
    <div
      className="bg-cover bg-center w-full h-screen overflow-y-scroll"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <Nav />
        <CreateStudentCourse />
        
      </div>
    </div>
  );
};

export default Course;
