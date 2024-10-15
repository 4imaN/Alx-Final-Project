import ProfileData from "./components/ProfileData.tsx";
import bg from "../../assets/appBg.png"
import Nav from "../../components/Nav.tsx";

const Profile = () => {
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
        <ProfileData />
      </div>
    </div>
  );
};

export default Profile;