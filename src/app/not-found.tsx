import Image from "next/image";
import JonathanYun from "@/src/public/images/JonathanYun.png";

const NotFound = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-8 py-12 text-center">
      <h1 className="font-regular text-8xl">404</h1>
      <p className="text-lg">You&apos;re so silly!! This page, user, or keyboard does not exist :(</p>
      <Image src={JonathanYun} alt="Jonathan Yun" className="rounded-[1.75rem]" />
    </div>
  );
};

export default NotFound;
