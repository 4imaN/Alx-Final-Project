import Nav from "../../components/Nav.tsx";
import CreateClassroomPage from "./Components/CreateClassRoom.tsx";
import bg from "../../assets/appBg.png"

const Room = () => {
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
        <CreateClassroomPage />
      </div>
    </div>
  );
};

export default Room;