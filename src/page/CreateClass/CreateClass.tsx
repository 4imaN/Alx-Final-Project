import bg from "../../assets/appBg.png";
import Nav from "../../components/Nav";
import AssignInstructor from "./components/AssignInstructor";

const CreateClass = () => {
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
        <AssignInstructor />
        
      </div>
    </div>
  );
};

export default CreateClass;
