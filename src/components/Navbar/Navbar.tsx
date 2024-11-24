import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ThemeToggleButton from "../General/ThemeToggleButton";
import NavAuth from "./NavAuth";
import NavAddKeyboardButton from "./NavAddKeyboardButton";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-6 min-[1360px]:px-36">
      <div className="navbar-start">
        <ul className="menu menu-horizontal hidden space-x-8 px-4 min-[950px]:flex">
          <li>
            <Link href="/" className="btn-nav-link btn shadow-none">
              <p className="text-base font-normal shadow-nav-text-contour text-shadow-lg">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/explore" className="btn-nav-link btn shadow-none">
              <p className="text-base font-normal shadow-nav-text-contour text-shadow-lg">Explore</p>
            </Link>
          </li>
          <li>
            <Link href="/about" className="btn-nav-link btn shadow-none">
              <p className="text-base font-normal shadow-nav-text-contour text-shadow-lg">About</p>
            </Link>
          </li>
        </ul>
        <div className="dropdown dropdown-bottom z-50 min-[950px]:hidden">
          <label tabIndex={0} className="btn m-1">
            <FontAwesomeIcon icon={faBars} size="xl" />
          </label>
          <ul tabIndex={0} className="menu dropdown-content z-10 w-56 rounded-box bg-base-200">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/explore">Explore</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn-nav-link btn shadow-none">
          <p className="font-clashgrotesk text-3xl font-medium shadow-nav-text-contour text-shadow-lg">MechBuilds</p>
        </Link>
      </div>
      <div className="navbar-end flex">
        <ul className="menu menu-horizontal flex align-middle text-base shadow-nav-text-contour text-shadow-lg">
          <li>
            <NavAddKeyboardButton />
          </li>
        </ul>
        <div className="h-6 border-l border-gray-400 pr-6"></div>
        <div className="flex flex-row items-center space-x-5">
          <ThemeToggleButton />
          <NavAuth />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
