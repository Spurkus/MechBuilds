"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "../context/Authentication";
import { useGlobalModalContext } from "../context/GlobalModal";
import { closeDropdown } from "../helper/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface NavProfileMenuType {
  displayName?: string | null;
  profilePicture?: string | null;
}

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
    <button onClick={signInWithGoogle} className="btn btn-outline btn-info btn-sm pb-9">
      <p className="mt-3 font-satoshi">Login | Register</p>
    </button>
  );
};

const NavProfileMenu = ({ profilePicture = null, displayName = null }: NavProfileMenuType) => {
  const { user, logout } = useAuthContext();
  const { handleModalError } = useGlobalModalContext();

  const profile = profilePicture || user?.photoURL;
  const name = displayName || user?.displayName;

  if (!profile) {
    handleModalError("User is invalid");
    return <AuthLoadingButton />;
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn w-full grow rounded-xl px-3 text-base">
        <Image
          src={profile}
          alt="profile picture"
          width={34}
          height={34}
          className="aspect-square rounded-xl"
        />
        <p className="font-satoshi">{name}</p>
        <FontAwesomeIcon icon={faCaretDown} className="h-4 w-4" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] mt-2 w-52 rounded-box bg-base-200 p-2 shadow"
      >
        <li onClick={closeDropdown}>
          <Link href="/profile" className="font-satoshi">
            Profile
          </Link>
        </li>
        <li onClick={closeDropdown}>
          <button onClick={logout} className="font-satoshi">
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

const NavAuth = () => {
  const { authenticated, displayName, profilePicture } = useAuthContext();
  return authenticated ? (
    <NavProfileMenu displayName={displayName} profilePicture={profilePicture} />
  ) : (
    <LoginRegisterButton />
  );
};

export default NavAuth;
