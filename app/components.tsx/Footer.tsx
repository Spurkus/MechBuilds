import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center rounded bg-base-100 p-10 text-base-content">
      <nav className="grid grid-flow-col gap-4">
        <Link className="link-hover link" href="/">
          Home
        </Link>
        <Link className="link-hover link" href="/explore">
          Explore
        </Link>
        <Link className="link-hover link" href="/about">
          About
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link href="https://www.linkedin.com/in/oscartangdev/">
            <FontAwesomeIcon icon={faLinkedin} className="h-7 w-7" />
          </Link>
          <Link href="https://github.com/Spurkus/MechBuilds">
            <FontAwesomeIcon icon={faGithub} className="h-7 w-7" />
          </Link>
          <Link href="https://www.youtube.com/watch?v=HMTKMWHLbdQ">
            <FontAwesomeIcon icon={faMedium} className="h-7 w-7" />
          </Link>
        </div>
      </nav>
      <aside>
        <p>
          A keyboard management app for custom mechanical keyboard enthusiasts
          :3
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
