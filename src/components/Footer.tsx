import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer footer-center rounded bg-base-100 p-6 text-base-content">
      <div className="space-y-4">
        <nav className="grid grid-flow-col gap-4">
          <Link href="/" className="btn-nav-link btn btn-sm shadow-none">
            <p className="text-base font-medium">Home</p>
          </Link>
          <Link href="/explore" className="btn-nav-link btn btn-sm shadow-none">
            <p className="text-base font-medium">Explore</p>
          </Link>
          <Link href="/about" className="btn-nav-link btn btn-sm shadow-none">
            <p className="text-base font-medium">About</p>
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link
              href="https://www.linkedin.com/in/oscartangdev/"
              className="btn-nav-xs btn btn-circle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} className="h-7 w-7" />
            </Link>
            <Link
              href="https://github.com/Spurkus/MechBuilds"
              className="btn-nav-xs btn btn-circle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className="h-7 w-7" />
            </Link>
            <Link
              href="https://www.youtube.com/watch?v=HMTKMWHLbdQ"
              className="btn-nav-xs btn btn-circle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} className="h-7 w-7" />
            </Link>
          </div>
        </nav>
      </div>
      <aside className="flex">
        <span className="text-base">
          A keyboard management app for custom mechanical keyboard enthusiasts{" "}
          <span className="font-sans">:3</span>
        </span>
      </aside>
    </footer>
  );
};

export default Footer;
