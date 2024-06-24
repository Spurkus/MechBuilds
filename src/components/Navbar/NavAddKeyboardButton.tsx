"use client";
import Link from "next/link";
import { useAuthContext } from "@/src/context/Authentication";
import { useGlobalModalContext } from "@/src/context/GlobalModal";

const NavAddKeyboardButton = () => {
  const { authenticated } = useAuthContext();
  const { handleModal } = useGlobalModalContext();

  const addKeyboardBeforeAuth = () => {
    handleModal(
      "Authentication Required",
      "You need to login first before you can add a keyboard!!",
      "fail",
    );
  };

  if (authenticated) {
    return (
      <Link href="profile#add" className="btn-nav-link btn shadow-none">
        <p className="text-base font-normal shadow-nav-text-contour text-shadow-lg">Add Keyboard</p>
      </Link>
    );
  } else {
    return (
      <button className="btn-nav-link btn shadow-none" onClick={addKeyboardBeforeAuth}>
        <p className="text-base font-normal shadow-nav-text-contour text-shadow-lg">Add Keyboard</p>
      </button>
    );
  }
};

export default NavAddKeyboardButton;
