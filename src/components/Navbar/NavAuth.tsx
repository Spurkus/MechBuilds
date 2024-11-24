"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/src/context/Authentication";
import { useGlobalModalContext } from "@/src/context/GlobalModal";
import { closeDropdown, adjustImageURL } from "@/src/helper/helperFunctions";
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
        <p className="pl-2">Loading...</p>
      </div>
    </button>
  );
};

const LoginRegisterButton = () => {
  const { signInWithGoogle } = useAuthContext();
  return (
    <button onClick={signInWithGoogle} className="btn btn-outline btn-info btn-sm pb-9">
      <p className="mt-3">Login | Register</p>
    </button>
  );
};

const NavProfileMenu = ({ profilePicture = null, displayName = null }: NavProfileMenuType) => {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const { handleModalError } = useGlobalModalContext();

  const profile = profilePicture || user?.photoURL;
  const name = displayName || user?.displayName;

  // Redirect to home page if user is invalid
  if (!profile) {
    router.push("/");
    handleModalError("User is invalid");
    logout();
    return <AuthLoadingButton />;
  }

  // Sign out user and redirect to home page
  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="dropdown-auth dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn w-full grow rounded-xl px-2 text-base" onClick={closeDropdown}>
        <div className="avatar mask flex h-9 w-9">
          <Image
            src={adjustImageURL(profile, 300)}
            alt="profile picture"
            width={50}
            height={50}
            quality={100}
            className="aspect-square rounded-xl"
          />
        </div>
        <span className="max-md:hidden">{name}</span>
        <div className="max-md:hidden">
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-52 rounded-box bg-base-200 p-2 shadow-xl">
        <li onClick={() => closeDropdown()}>
          <Link href="/profile">Profile</Link>
        </li>
        <li onClick={() => closeDropdown()}>
          <Link href="/settings">Settings</Link>
        </li>
        <li onClick={() => closeDropdown()}>
          <button onClick={handleSignOut}>Sign Out</button>
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
