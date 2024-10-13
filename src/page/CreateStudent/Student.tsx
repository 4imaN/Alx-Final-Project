import CreateStudent from "./component/CreateStudent.tsx";
import Nav from "../../components/Nav.tsx";
import bg from "../../assets/appBg.png"
const Student = () => {
  return (
    <div
    className="bg-cover bg-center w-full h-screen overflow-y-scroll"
    style={{
      backgroundImage: `url(${bg})`,
      backgroundRepeat: "no-repeat",
    }}
    >
      <div className="flex flex-col h-full">
        <Nav />
        <div className="flex-grow ">
          <CreateStudent />
        </div>
      </div>
    </div>
  );
};

export default Student;