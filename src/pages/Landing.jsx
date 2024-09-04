import Hero from "../component/Hero.jsx";
import MapComponent from "../component/MapComponent.jsx";
import Navbar from "../component/Navbar.jsx";

const Landing = () => {
  return (
    <div className="mb-20">
      {/* <h3>started</h3> */}
      {/* <Navbar/> */}
      <Hero />
      <div>
        <h2 className="border-b-[2px] border-[2px text-lg pb-3 font-semibold mb-5">FUTA campus interactive map</h2>
        <MapComponent />
      </div>
    </div>
  );
};
export default Landing;
