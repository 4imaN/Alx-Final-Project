import bg from "../../assets/appBg.png";
import LinkInstructorPage from "./components/LinkInstructorPage.tsx";
import Nav from "../../components/Nav.tsx";

const LinkInstructor = () => {
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
        <LinkInstructorPage />
      </div>
    </div>
  );
};

export default LinkInstructor;