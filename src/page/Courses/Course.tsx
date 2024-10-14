
import Nav from "../../components/Nav.tsx";
import CreateCoursePage from "./components/CreateCoursePage.tsx";
import bg from "../../assets/appBg.png"

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
        <CreateCoursePage />
      </div>
    </div>
  );
};

export default Course;