import { NavLink } from "react-router-dom";
import futaLogo from "/futalogo.png";
import { FaFacebook, FaTwitter } from "react-icons/fa";

const navLinks = [
    {
        path: '/',
        text: 'Home',
    },
    {
        path: '/about',
        text: 'About',
    },
    {
        path: '/contact',
        text: 'Contact',
    }
]

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center max-w-[900px] mx-auto px-6">
        <img src={futaLogo} alt="" className="h-[4rem] w-[4rem] " />
        <h3 className="text-lg font-semibold">welcome back</h3>
        <div className="social-links flex gap-x-3">
          <FaFacebook className="text-[1.3rem]" />
          <FaTwitter className="text-[1.3rem]" />
        </div>
      </div>
      <div className="bg-base-200  ">
        <div className="max-w-[900px] mx-auto px-6 flex gap-x-4">
          {navLinks.map((link) => {
            return (
              <NavLink
                to={link.path}
                key={link.text}
                className={({ isActive }) =>
                  isActive
                    ? "btn-sm btn-primary btn rounded-none"
                    : " btn rounded-none btn-sm"
                }
              >
                {link.text}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
