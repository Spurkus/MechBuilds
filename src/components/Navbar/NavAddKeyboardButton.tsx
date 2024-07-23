"use client";
import { useAuthContext } from "@/src/context/Authentication";
import { useGlobalModalContext } from "@/src/context/GlobalModal";
import { useRouter } from "next/navigation";

const NavAddKeyboardButton = () => {
  const { authenticated } = useAuthContext();
  const { handleModal } = useGlobalModalContext();
  const router = useRouter();

  const handleClick = () => {
    if (authenticated) {
      router.push("/profile?add=true");
    } else {
      handleModal("Authentication Required", "You need to login first before you can add a keyboard!!", "fail");
    }
  };

  return (
    <button className="btn-nav-link btn shadow-none" onClick={handleClick}>
      <p className="text-base font-normal shadow-nav-text-contour text-shadow-lg">Add Keyboard</p>
    </button>
  );
};

export default NavAddKeyboardButton;
