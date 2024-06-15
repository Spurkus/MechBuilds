import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ThemeToggleButton from "./ThemeToggleButton";

const NavigationBar = () => {
  return (
    <div className="navbar bg-base-100 px-6 min-[1360px]:px-36">
      <div className="navbar-start">
        <ul className="menu menu-horizontal hidden space-x-8 px-4 font-satoshi text-base shadow-nav-text-contour text-shadow-lg min-[950px]:flex">
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
        <div className="dropdown dropdown-bottom z-30 min-[950px]:hidden">
          <label tabIndex={0} className="btn m-1">
            <FontAwesomeIcon icon={faBars} className="h-7 w-7" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-10 w-56 rounded-box bg-base-200"
          >
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
        <a className="font-clashgrotesk text-3xl font-medium shadow-nav-text-contour text-shadow-lg">
          MechBuilds
        </a>
      </div>
      <div className="navbar-end flex">
        <ul className="menu menu-horizontal flex align-middle font-satoshi text-base shadow-nav-text-contour text-shadow-lg">
          <li>
            <Link href="/profile#add">Add Keyboard</Link>
          </li>
        </ul>
        <div className="h-6 border-l border-gray-400 pr-6"></div>
        <div className="flex flex-row items-center space-x-5">
          <ThemeToggleButton />
          <Link href="/">
            <button className="btn btn-outline btn-info btn-sm pb-9">
              <p className="mt-3">Login | Register</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
