import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ThemeToggleButton from "./ThemeToggleButton";

const NavigationBar = () => {
  return (
    <div className="navbar bg-base-100 px-6 min-[1360px]:px-36">
      <div className="navbar-start">
        <ul className="shadow-nav-text-contour menu menu-horizontal hidden space-x-8 px-4 font-satoshi text-base text-shadow-lg min-[950px]:flex">
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
        <a className="shadow-nav-text-contour font-clashgrotesk text-3xl font-medium text-shadow-lg">
          MechBuilds
        </a>
      </div>
      <div className="navbar-end">
        <ul className="shadow-nav-text-contour menu menu-horizontal flex space-x-8 px-6 align-middle font-satoshi text-base text-shadow-lg">
          <li>
            <Link href="/profile#add">Add Keyboard</Link>
          </li>
          <li>
            <Link href="/">Login / Register</Link>
          </li>
        </ul>
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default NavigationBar;
