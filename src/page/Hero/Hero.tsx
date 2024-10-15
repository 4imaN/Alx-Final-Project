import bg from "../../assets/appBg.png";
import Landing from "./Component/Landing.tsx";
import Nav from "../../components/Nav.tsx";

const Hero = () => {
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
        
        <Landing />
      </div>
    </div>
  );
};

export default Hero;