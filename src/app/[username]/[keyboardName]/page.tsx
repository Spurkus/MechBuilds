"use client";
import { useState, useEffect } from "react";
import { UserProfileType } from "@/src/types/user";
import { ItemType, KeyboardType } from "@/src/types/keyboard";
import Loading from "@/src/components/General/Loading";
import { getUser, getKeyboardForKeyboardPage } from "@/src/helper/firestoreFunctions";
import {
  formatNameForURL,
  formatDate,
  capitalizeFirstLetter,
  formatLink,
  truncateString,
  ensureHttpsLink,
} from "@/src/helper/helperFunctions";
import Link from "next/link";
import NotFound from "@/src/app/not-found";
import { useAuthContext } from "@/src/context/Authentication";
import DisplayImageVideo from "@/src/components/General/DisplayImageVideo";
import ProfileKeyboardDetails from "@/src/components/ProfileDetails/ProfileKeyboardDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import ShareKeyboard from "./ShareKeyboard";

interface KeyboardPageProps {
  params: {
    username: string;
    keyboardName: string;
  };
}

interface NameLinkCollapseProps {
  keyboardElement?: string;
  extra?: JSX.Element;
  name?: string;
  link: string;
  big?: boolean;
  index?: number;
}

const NameLinkCollapse = ({ keyboardElement, extra, name, link, big = true, index }: NameLinkCollapseProps) => {
  const [clicked, setClicked] = useState(false);
  return link !== "" ? (
    <div
      tabIndex={0}
      className={`collapse overflow-hidden rounded-[0.875rem] ${!big && clicked && "mt-1"} ${clicked && "mb-3"} collapse-transition`}
    >
      <input
        type="checkbox"
        id="case"
        onClick={() => setClicked(!clicked)}
        className="collapse-checkbox peer min-h-0"
      />
      <div
        className={`collapse-title min-h-0 p-0 pb-2 peer-checked:bg-base-200 peer-checked:pb-0 ${(big || index !== 0) && "pl-1.5"} ${big ? "peer-checked:p-3" : "peer-checked:px-3 peer-checked:pt-1"}`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            {big && (
              <p className={`${big ? "text-2xl font-bold leading-5" : "text-xl font-medium leading-4"}`}>
                {keyboardElement}
                {extra}
              </p>
            )}
            <p className="truncate text-wrap break-all text-xl">{name}</p>
          </div>
          <FontAwesomeIcon icon={faLink} className="absolute right-2" />
        </div>
      </div>
      <div className="collapse-content p-0 peer-checked:bg-base-200">
        {link && (
          <Link
            href={ensureHttpsLink(link)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm mx-3 my-1 justify-start rounded-xl"
          >
            <div className="flex flex-row">
              <FontAwesomeIcon icon={faLink} className="mr-1 h-3.5 w-3.5 rotate-90 text-gray-500" />
              <p className="link truncate text-wrap break-all text-sm leading-[0.6rem] text-gray-500">
                {truncateString(formatLink(link), 36)}
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  ) : (
    <div className={big ? "ml-1.5" : ""}>
      {big && (
        <p
          className={`truncate text-wrap break-all ${big ? "text-2xl font-bold leading-6" : "mt-2 text-xl font-medium leading-5"}`}
        >
          {keyboardElement}
          {extra}
        </p>
      )}
      <p className="truncate text-wrap break-all text-xl">{name}</p>
    </div>
  );
};

const KeyboardPage = ({ params }: KeyboardPageProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [keyboard, setKeyboard] = useState<KeyboardType | null>(null);
  const [index, setIndex] = useState(0);
  const { username, authenticated } = useAuthContext();

  useEffect(() => {
    getUser(params.username).then((user) => {
      setUser(user);
      if (!user) return setLoading(false);
      getKeyboardForKeyboardPage(
        user.uid,
        formatNameForURL(params.keyboardName),
        username === params.username.toLowerCase() && authenticated,
      ).then((keyboard) => {
        setLoading(false);
        setKeyboard(keyboard);
      });
    });
  }, [params.keyboardName, params.username, username, authenticated]);

  if (loading)
    return (
      <div className="flex w-full items-center justify-center">
        <Loading />
      </div>
    );

  if (!user || !keyboard) return <NotFound />;

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-3">
      <div className="flex w-full max-w-[45rem] flex-col justify-between gap-3 sm:flex-row">
        <ProfileKeyboardDetails userProfile={user} />
        <ShareKeyboard username={params.username} keyboard={keyboard} />
      </div>
      <div id="keyboard-container" className="flex max-w-[45rem] flex-col rounded-[1.5rem] bg-base-300 px-5 py-4">
        <DisplayImageVideo
          index={index}
          setIndex={setIndex}
          imageVideoList={keyboard.media}
          isMediaVideo={keyboard.isMediaVideo}
        />
        <div className="mx-1 flex grow flex-col justify-between sm:flex-row">
          <h1 className="truncate text-wrap break-all pt-1 font-clashgrotesk text-6xl font-medium">{keyboard.name}</h1>
          <span className="text-3xl font-bold text-gray-500">{formatDate(keyboard.createdAt)}</span>
        </div>
        {keyboard.mods.length > 0 && (
          <div className="mb-3 flex w-full flex-row truncate">
            <div className="flex w-0 grow flex-row space-x-2 overflow-x-auto overflow-y-hidden">
              {keyboard.mods.map((mod: string, index: number) => (
                <div key={index} className="badge badge-neutral badge-lg space-x-1 px-2.5 py-3.5">
                  <span className="text-md mb-[0.1rem] truncate font-bold">{mod}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col">
          {!!keyboard.kitName.length && (
            <NameLinkCollapse
              keyboardElement="Kit"
              extra={
                <span className="truncate text-wrap break-all text-gray-500">
                  {keyboard.kit.length > 0 && (
                    <>
                      <span className="truncate text-wrap break-all text-base-content">: </span>[
                      {keyboard.kit.map((kitItem: string) => capitalizeFirstLetter(kitItem)).join(", ")}]
                    </>
                  )}
                </span>
              }
              name={keyboard.kitName}
              link={keyboard.kitLink}
            />
          )}
          <div className="mb-1.5 ml-1.5">
            <p className="text-2xl font-bold leading-5">Size</p>
            <p className="truncate text-wrap break-all text-xl">{keyboard.size}</p>
          </div>
          {!keyboard.kit.includes("case") && (
            <NameLinkCollapse keyboardElement="Case" name={keyboard.case} link={keyboard.caseLink} />
          )}
          {!keyboard.kit.includes("pcb") && (
            <NameLinkCollapse keyboardElement="PCB" name={keyboard.pcb} link={keyboard.pcbLink} />
          )}
          {!keyboard.kit.includes("plate") && (
            <NameLinkCollapse keyboardElement="Plate" name={keyboard.plate} link={keyboard.plateLink} />
          )}
          <div className="mb-1.5 ml-1.5">
            <p className="text-2xl font-bold leading-5">Switches</p>
            <div className="flex flex-row gap-6">
              {keyboard.switches.map((switches: ItemType, index: number) => (
                <>
                  {index > 0 && <div className="mt-1 h-5 border-l border-gray-400"></div>}
                  <NameLinkCollapse
                    key={index}
                    keyboardElement="switch"
                    extra={
                      <>
                        <span className="text-base-content">: </span>
                        <span className="text-gray-500">{index}</span>
                      </>
                    }
                    name={switches.name}
                    link={switches.link}
                    big={false}
                    index={index}
                  />
                </>
              ))}
            </div>
          </div>
          {(!keyboard.kit.includes("keycaps") || keyboard.keycaps.length > 1) && (
            <div className="mb-1.5 ml-1.5">
              <p className="text-2xl font-bold leading-5">Keycaps</p>
              <div className="flex flex-row gap-6">
                {keyboard.keycaps.map((keycap: ItemType, index: number) => (
                  <>
                    {index > 0 && <div className="mt-1 h-5 border-l border-gray-400"></div>}
                    <NameLinkCollapse
                      key={index}
                      keyboardElement="keycap"
                      extra={
                        <>
                          <span className="text-base-content">: </span>
                          <span className="text-gray-500">{index}</span>
                        </>
                      }
                      name={keycap.name}
                      link={keycap.link}
                      big={false}
                      index={index}
                    />
                  </>
                ))}
              </div>
            </div>
          )}
          {(!keyboard.kit.includes("stabilizers") || keyboard.stabilizers.length > 1) && (
            <div className="mb-1.5 ml-1.5">
              <p className="text-2xl font-bold leading-5">Stabilizers</p>
              <div className="flex flex-row gap-6">
                {keyboard.stabilizers.map((stabilizer: ItemType, index: number) => (
                  <>
                    {index > 0 && <div className="mt-1 h-5 border-l border-gray-400"></div>}
                    <NameLinkCollapse
                      key={index}
                      keyboardElement="stabilizer"
                      extra={
                        <>
                          <span className="text-base-content">: </span>
                          <span className="text-gray-500">{index}</span>
                        </>
                      }
                      name={stabilizer.name}
                      link={stabilizer.link}
                      big={false}
                      index={index}
                    />
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
        {keyboard.description && (
          <>
            <div className="ml-1.5 mt-1.5">
              <p className="text-2xl font-bold leading-5">Description</p>
            </div>
            <div className="mx-0.5 my-2 rounded-2xl bg-base-200 px-2 py-1.5">
              <p className="truncate text-wrap break-all text-xl">{keyboard.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KeyboardPage;
