import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="mx-auto mt-8 flex w-auto flex-col space-y-6 md:max-w-[80%]">
      <div className="flex w-full flex-col items-center">
        <h3 className="font-regular font-clashgrotesk text-xl">
          Brought to life by everyone&apos;s support, started with love by{" "}
          <Link href="https://github.com/Spurkus" target="_blank" rel="noopener noreferrer" className="underline">
            Spurkus
          </Link>{" "}
          :3
        </h3>
        <h3 className="font-regular font-clashgrotesk text-lg">
          &quot;Lubing is my passion&quot; -{" "}
          <Link
            href="https://www.linkedin.com/in/thejonathanyun"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Jonathan Yun
          </Link>
          , 2024
        </h3>
      </div>
      <div>
        <h1 className="font-regular font-clashgrotesk text-5xl">About</h1>
        <p className="text-lg">
          MechBuilds is a <span className="font-bold">keyboard management app</span> for custom mechanical keyboard
          enthusiasts. It was created to help users organize their keyboard builds and share them with the community.
          Please note that trading or selling keyboards is NOT encouraged on this platform, as MechBuilds is not
          designed for such activities. We are not responsible for any trades, sales, or potential scams that may occur
          outside the intended use of the platform.
          <br />
          <br />
          We hope you enjoy your stay! <span className="text-gray-500">meow</span>
        </p>
      </div>
      <div>
        <h1 className="font-regular font-clashgrotesk text-5xl">Support MechBuilds</h1>
        <p className="text-lg">
          The best way to support MechBuilds is to{" "}
          <span className="font-bold">share it with your friends and the community</span>! You can also help by turning
          off adblockers and allowing ads on MechBuilds. If you want to support MechBuilds even further, you can donate
          to directly support the development and maintenance of the platform; your name will be added to the awesome
          supporters list below! Doing this will help keep MechBuilds running and growing.
          <br />
          <br />
          Truly, thank you everyone for your support!
        </p>
        <Link
          href="https://ko-fi.com/spurkus"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-lg mt-2 w-full rounded-xl border-2 text-xl"
        >
          Donate ❤️
        </Link>
      </div>
      <div>
        <h1 className="font-regular font-clashgrotesk text-5xl">Contact Us</h1>
        <p className="text-lg">If you have any questions, concerns, or feedback, please feel free to contact us at</p>
        <div className="flex flex-row gap-x-4">
          <Link
            href="https://discord.gg/Sw6pHTp4yf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-2 grow rounded-xl border-2 text-lg"
          >
            Discord <FontAwesomeIcon icon={faDiscord} size="lg" />
          </Link>
          <Link
            href="https://github.com/Spurkus/MechBuilds/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-2 grow rounded-xl border-2 text-lg"
          >
            Github Issues <FontAwesomeIcon icon={faGithub} size="lg" />
          </Link>
          <Link
            href="mailto:oscartang.dev@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-2 grow rounded-xl border-2 text-lg"
          >
            Email <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </Link>
        </div>
      </div>
      <div>
        <h1 className="font-regular font-clashgrotesk text-5xl">Credits</h1>
        <ul className="text-lg">
          <li>
            No one at the moment but if you want to be credited, please contact me{" "}
            <span className="font-clashgrotesk">:3</span>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-regular font-clashgrotesk text-5xl">Supporters</h1>
        {/* Will be used for names of supporters in the future when we have some :3
        <ul className="grid grid-cols-5 gap-x-4 text-xl">
        </ul>
        */}
        <ul className="text-lg">
          <li>
            Also no one at the moment <span className="text-gray-500">(sadge)</span> but if you want to be a supporter,
            go above to the <span className="underline">support area</span> and help out any way you can! ❤️
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-regular font-clashgrotesk text-5xl">Contributors</h1>
        {/* Will be used for names of contributors in the future when we have some :3
        <ul className="grid grid-cols-5 gap-x-4 text-xl">
        </ul>
        */}
        <ul className="text-lg">
          <li>
            Also no one at the moment <span className="text-gray-500">(double sadge)</span> but if you want to be a
            contributor, go to the{" "}
            <Link
              href="https://github.com/Spurkus/MechBuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              MechBuilds github page
            </Link>{" "}
            and contribute by making a pull request! 🚀
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
