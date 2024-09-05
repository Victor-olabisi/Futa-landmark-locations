import AboutImg from "/FUTA.jpg";

const categories = [
  "lecture theatres",
  "faculty",
  "administrative buildings",
  "staff qauters",
  "banks",
  "hostels",
];

const About = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-20">
      <div className="grid md:grid-cols-3 gap-8 ">
        <div className="col-span-2">
          <img src={AboutImg} alt="" className="rounded-xl mb-6" />
          <h2 className="uppercase font-semibold text-xl mb-2">about us</h2>
          <p className="max-w-[40rem]">
            Welcome to the FUTA Web GIS Platform! Our mission is to provide
            students, staff, and visitors of the Federal University of
            Technology, Akure (FUTA), with a seamless and efficient way to
            navigate the campus. Our platform is designed to map key landmarks
            and locations across the university, making it easier to find
            buildings, departments, and other important spots within the school
            premises. By leveraging modern web GIS technology, we aim to enhance
            the on-campus experience for all users, ensuring that no one gets
            lost and everyone can easily find their way around. With our
            user-friendly search functionality and detailed map data, the FUTA
            Web GIS Platform is your go-to solution for exploring the campus.
            Whether you're new to FUTA or just need to find a specific location,
            we're here to guide you!
          </p>
          <p></p>
        </div>
        <div className=" md:col-span-1 items-self-stretch">
          <h2 className="uppercase font-semibold text-xl mb-4">categories</h2>
          <div className="">
            {categories.map((category,index) => {
              return (
                <div
                  className="p-5 border-2 border-b-0 border-black-500 capitalize w-full inline-block"
                  key={category}
                >
                  {category}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
