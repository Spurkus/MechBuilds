"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "../context/Authentication";
import { useGlobalModalContext } from "../context/GlobalModal";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthLoadingButton = () => {
  return (
    <button className="btn btn-sm rounded-xl px-3 pb-9 text-base">
      <div className="mt-1.5 flex">
        <span className="loading loading-spinner"></span>
        <p className="pl-2 font-satoshi">Loading...</p>
      </div>
    </button>
  );
};
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

const NavProfileMenu = () => {
  const { user, logout } = useAuthContext();
  const { setModalOpen, setModalTitle, setModalMessage, setModalTheme } =
    useGlobalModalContext();

  if (!user || !user.photoURL) {
    setModalTitle("Error");
    setModalMessage("User cannot be found");
    setModalTheme("error");
    setModalOpen(true);
    return;
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn rounded-xl px-3 text-base">
        <Image
          src={user.photoURL}
          alt="profile picture"
          width={34}
          height={34}
          className="square rounded-xl"
        />
        <p className="font-satoshi">{user.displayName}</p>
        <div className="swap swap-rotate">
          <input type="checkbox" />
          <FontAwesomeIcon icon={faCaretDown} className="swap-off" />
          <FontAwesomeIcon icon={faCaretUp} className="swap-on" />
        </div>
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
  const { user, authLoading } = useAuthContext();
  if (authLoading) return <AuthLoadingButton />;
  return user ? <NavProfileMenu /> : <LoginRegisterButton />;
};

export default NavAuth;
