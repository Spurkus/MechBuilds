"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "../context/Authentication";
import { useGlobalModalContext } from "../context/GlobalModal";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavProfileMenuType {
  displayName?: string | null;
  profilePicture?: string | null;
}

const LoginRegisterButton = () => {
  const { signInWithGoogle } = useAuthContext();
  return (
    <button
      onClick={signInWithGoogle}
      className="btn btn-outline btn-info btn-sm pb-9"
    >
      <p className="mt-3 font-satoshi">Login | Register</p>
    </button>
  );
};

const NavProfileMenu = ({
  profilePicture = null,
  displayName = null,
}: NavProfileMenuType) => {
  const { user, logout } = useAuthContext();
  const { setModalOpen, setModalTitle, setModalMessage, setModalTheme } =
    useGlobalModalContext();

  let profile, name;

  if (profilePicture) {
    profile = profilePicture;
  } else {
    if (!user || !user.photoURL) {
      setModalTitle("Error");
      setModalMessage("User is invalid");
      setModalTheme("error");
      setModalOpen(true);
      return;
    }
    profile = user.photoURL;
  }

  if (displayName) {
    name = displayName;
  } else {
    name = user?.displayName;
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn rounded-xl px-3 text-base">
        <Image
          src={profile}
          alt="profile picture"
          width={34}
          height={34}
          className="square rounded-xl"
        />
        <p className="font-satoshi">{name}</p>
        <FontAwesomeIcon icon={faCaretDown} className="h-4 w-4" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] mt-2 w-52 rounded-box bg-base-200 p-2 shadow"
      >
        <li>
          <Link href="/profile" className="font-satoshi">
            Profile
          </Link>
        </li>
        <li>
          <button onClick={logout} className="font-satoshi">
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

const NavAuth = () => {
  const { authenticated, username, profilePicture } = useAuthContext();
  return authenticated ? (
    <NavProfileMenu displayName={username} profilePicture={profilePicture} />
  ) : (
    <LoginRegisterButton />
  );
};

export default NavAuth;
