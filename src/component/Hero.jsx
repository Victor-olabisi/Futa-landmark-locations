import FutaBanner from "/bannerImg.jpg";

const Hero = () => {
  return (
    <div className="py-10">
      <div className=" ">
        <h2 className="text-2xl mb-4 font-bold">
          Explore FUTA’s Landmarks with Interactive GIS Mapping
        </h2>
        <p className="max-w-[40rem]">
          Welcome to FUTA’s interactive map. Navigate the campus and discover
          key landmarks with ease. This GIS platform offers detailed information
          on important locations, helping you find your way around effortlessly.
        </p>

        <img
          src={FutaBanner}
          alt=""
          className="w-[100%] h-[10rem] md:h-auto  object-cover position-top rounded-xl mt-6"
        />
      </div>
    </div>
  );
};
export default Hero;
