"use client";
import Loading from "@/src/components/Loading";
import NextImage from "next/image";
import {
  AddKeyboardContextProvider,
  useAddKeyboardContext,
} from "@/src/context/AddKeyboardContext";
import {
  closeModal,
  showModal,
  closeDropdown,
  formatSocialLink,
} from "@/src/helper/helperFunctions";
import { useState } from "react";
import {
  DEFAULT_KEYBOARD_IMAGE,
  DEFAULT_KEYBOARD_IMAGE_HEIGHT,
  DEFAULT_KEYBOARD_IMAGE_WIDTH,
} from "@/src/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLink } from "@fortawesome/free-solid-svg-icons";

interface AddKeyboardModalProps {
  open: boolean;
  setAddKeyboard: (value: boolean) => void;
}

interface AddKeyboardFormProps {
  closeKeyboardModal: () => void;
}

const AddKeyboardButton = () => {
  const [addKeyboard, setAddKeyboard] = useState(false);
  return (
    <>
      <button
        className="btn btn-outline btn-info btn-sm mr-2 self-center rounded-xl px-5 pb-10 text-base"
        onClick={() => showModal("addkeyboardmodal", () => setAddKeyboard(true))}
      >
        <span className="mt-2">Add Keyboard</span>
      </button>
      <AddKeyboardModal open={addKeyboard} setAddKeyboard={setAddKeyboard} />
    </>
  );
};

const ScreenTwo = () => {
  const {
    kitName,
    setKitName,
    validKitName,
    kit,
    setKit,
    validKit,
    kitLink,
    setKitLink,
    validKitLink,
    kitSelectedLink,
    setKitSelectedLink,
    caseName,
    setCaseName,
    validCaseName,
    caseLink,
    setCaseLink,
    validCaseLink,
    caseSelectedLink,
    setCaseSelectedLink,
    pcbName,
    setPcbName,
    validPcbName,
    pcbLink,
    setPcbLink,
    validPcbLink,
    pcbSelectedLink,
    setPcbSelectedLink,
    plateName,
    setPlateName,
    validPlateName,
    plateLink,
    setPlateLink,
    validPlateLink,
    plateSelectedLink,
    setPlateSelectedLink,
    size,
    setSize,
    validSize,
  } = useAddKeyboardContext();
  const [isKitLinkFocused, setKitLinkFocused] = useState(false);
  const [isCaseLinkFocused, setCaseLinkFocused] = useState(false);
  const [isPcbLinkFocused, setPcbLinkFocused] = useState(false);
  const [isPlateLinkFocused, setPlateLinkFocused] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <label className="label pb-0 font-bold">Keyboard Kit</label>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm flex w-full grow flex-col items-center rounded-lg border border-gray-400 pl-2.5 text-sm hover:border-white focus:border-white"
              >
                <p className="self-start">Do you have a Keyboard Kit?</p>
                <FontAwesomeIcon icon={faCaretDown} className="h-4 w-4 self-end" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[3] mt-2 w-full rounded-xl border border-white bg-base-100 p-[0.3rem] shadow"
              >
                <li
                  onClick={() => {
                    closeDropdown();
                  }}
                >
                  <a className="w-full justify-center font-bold">yes</a>
                </li>
                <li
                  onClick={() => {
                    closeDropdown();
                  }}
                >
                  <a className="w-full justify-center font-bold">no</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex grow flex-col">
            <label className="label ml-3 pb-0 font-bold">
              Kit {kitSelectedLink ? "Link (Optional)" : "Name"}
            </label>
            <div className="flex flex-row">
              {kitSelectedLink ? (
                <input
                  type="text"
                  placeholder="www.example.com"
                  id="kitlink"
                  maxLength={100}
                  className={`ml-3 mr-2 grow truncate rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
                    validKitLink || !kitLink ? "bg-base-200" : "bg-input-error"
                  }`}
                  autoComplete="off"
                  onFocus={() => setKitLinkFocused(true)}
                  onBlur={() => setKitLinkFocused(false)}
                  onChange={(e) => setKitLink(e.target.value)}
                  value={isKitLinkFocused ? kitLink : formatSocialLink(kitLink)}
                />
              ) : (
                <input
                  type="text"
                  placeholder="Chosfox CF81"
                  maxLength={50}
                  className={`ml-3 mr-2 grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
                    validKitName || !kitName ? "bg-base-200" : "bg-input-error"
                  }`}
                  id="kitname"
                  autoComplete="off"
                  onChange={(e) => setKitName(e.target.value)}
                  value={kitName}
                />
              )}
              <button
                className={`btn btn-square btn-outline btn-sm self-center rounded-lg ${kitSelectedLink ? "btn-active" : ""}`}
                onClick={() => setKitSelectedLink(!kitSelectedLink)}
              >
                <FontAwesomeIcon icon={faLink} className="ml-[0.1rem] mt-[0.1rem]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-1.5">
        <label className="btn btn-neutral btn-sm cursor-pointer px-2.5">
          <span className="label-text">Case</span>
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </label>
        <label className="btn btn-neutral btn-sm cursor-pointer px-2.5">
          <span className="label-text">PCB</span>
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </label>
        <label className="btn btn-neutral btn-sm cursor-pointer px-2.5">
          <span className="label-text">Plate</span>
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </label>
        <label className="btn btn-neutral btn-sm cursor-pointer px-2.5">
          <span className="label-text">Stabilizers</span>
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </label>
        <label className="btn btn-neutral btn-sm cursor-pointer px-2.5">
          <span className="label-text">Keycaps</span>
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </label>
      </div>

      <div className="flex flex-col">
        <label className="label pb-0 pt-0 font-bold">
          Case {caseSelectedLink ? "Link (Optional)" : "Name"}
        </label>
        <div className="flex flex-row">
          {caseSelectedLink ? (
            <input
              type="text"
              placeholder="www.example.com"
              id="caselink"
              maxLength={100}
              className={`mr-2 grow truncate rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
                validCaseLink || !caseLink ? "bg-base-200" : "bg-input-error"
              }`}
              autoComplete="off"
              onFocus={() => setCaseLinkFocused(true)}
              onBlur={() => setCaseLinkFocused(false)}
              onChange={(e) => setCaseLink(e.target.value)}
              value={isCaseLinkFocused ? caseLink : formatSocialLink(caseLink)}
            />
          ) : (
            <input
              type="text"
              placeholder="KBDfans Tofu65"
              maxLength={50}
              className={`mr-2 grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
                validCaseName || !caseName ? "bg-base-200" : "bg-input-error"
              }`}
              id="casename"
              autoComplete="off"
              onChange={(e) => setCaseName(e.target.value)}
              value={caseName}
            />
          )}
          <button
            className={`btn btn-square btn-outline btn-sm self-center rounded-lg ${caseSelectedLink ? "btn-active" : ""}`}
            onClick={() => setCaseSelectedLink(!caseSelectedLink)}
          >
            <FontAwesomeIcon icon={faLink} className="ml-[0.1rem] mt-[0.1rem]" />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="label pb-0 pt-0.5 font-bold">
          PCB {pcbSelectedLink ? "Link (Optional)" : "Name"}
        </label>
        <div className="flex flex-row">
          {pcbSelectedLink ? (
            <input
              type="text"
              placeholder="www.example.com"
              id="pcblink"
              maxLength={100}
              className={`mr-2 grow truncate rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
                validPcbLink || !pcbLink ? "bg-base-200" : "bg-input-error"
              }`}
              autoComplete="off"
              onFocus={() => setPcbLinkFocused(true)}
              onBlur={() => setPcbLinkFocused(false)}
              onChange={(e) => setPcbLink(e.target.value)}
              value={isPcbLinkFocused ? pcbLink : formatSocialLink(pcbLink)}
            />
          ) : (
            <input
              type="text"
              placeholder="GH60"
              maxLength={50}
              className={`mr-2 grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
                validPcbName || !pcbName ? "bg-base-200" : "bg-input-error"
              }`}
              id="pcbname"
              autoComplete="off"
              onChange={(e) => setPcbName(e.target.value)}
              value={pcbName}
            />
          )}
          <button
            className={`btn btn-square btn-outline btn-sm self-center rounded-lg ${pcbSelectedLink ? "btn-active" : ""}`}
            onClick={() => setPcbSelectedLink(!pcbSelectedLink)}
          >
            <FontAwesomeIcon icon={faLink} className="ml-[0.1rem] mt-[0.1rem]" />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="label pb-0 pt-0.5 font-bold">
          Plate {plateSelectedLink ? "Link (Optional)" : "Name"}
        </label>
        <div className="flex flex-row">
          {plateSelectedLink ? (
            <input
              type="text"
              placeholder="www.example.com"
              id="platelink"
              maxLength={100}
              className={`mr-2 grow truncate rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
                validPlateLink || !plateLink ? "bg-base-200" : "bg-input-error"
              }`}
              autoComplete="off"
              onFocus={() => setPlateLinkFocused(true)}
              onBlur={() => setPlateLinkFocused(false)}
              onChange={(e) => setPlateLink(e.target.value)}
              value={isPlateLinkFocused ? plateLink : formatSocialLink(plateLink)}
            />
          ) : (
            <input
              type="text"
              placeholder="POM"
              maxLength={50}
              className={`mr-2 grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
                validPlateName || !plateName ? "bg-base-200" : "bg-input-error"
              }`}
              id="platename"
              autoComplete="off"
              onChange={(e) => setPlateName(e.target.value)}
              value={plateName}
            />
          )}
          <button
            className={`btn btn-square btn-outline btn-sm self-center rounded-lg ${plateSelectedLink ? "btn-active" : ""}`}
            onClick={() => setPlateSelectedLink(!plateSelectedLink)}
          >
            <FontAwesomeIcon icon={faLink} className="ml-[0.1rem] mt-[0.1rem]" />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="label pb-0 pt-0.5 font-bold">Size</label>
        <input
          type="text"
          placeholder="80% (TKL)"
          maxLength={50}
          className={`mr-2 grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
            validSize || !size ? "bg-base-200" : "bg-input-error"
          }`}
          id="keyboardsize"
          autoComplete="off"
          onChange={(e) => setSize(e.target.value)}
          value={size}
        />
      </div>
    </>
  );
};

const ScreenOne = () => {
  const { name, setName, validName } = useAddKeyboardContext();
  const [isHovering, setIsHovering] = useState(false);
  const source = DEFAULT_KEYBOARD_IMAGE;
  return (
    <>
      <div className="flex flex-col">
        <label className="label pb-0 font-bold">Keyboard Name</label>
        <input
          type="text"
          placeholder="Rainy 75"
          maxLength={50}
          className={`rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
            validName || !name ? "bg-base-200" : "bg-input-error"
          }`}
          id="keyboardname"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div
        className="avatar mask flex w-full grow self-center py-1"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <label className="relative w-full grow cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {}} />
          <div
            className={`${isHovering ? "flex" : "hidden"} absolute inset-0 items-center justify-center rounded-[1.5rem] bg-black bg-opacity-60`}
          >
            <span className="text font-bold text-white">Add Image</span>
          </div>
          <NextImage
            src={source}
            alt="Profile"
            className="aspect-video rounded-[1.5rem]"
            width={DEFAULT_KEYBOARD_IMAGE_WIDTH}
            height={DEFAULT_KEYBOARD_IMAGE_HEIGHT}
            quality={100}
          />
        </label>
      </div>
    </>
  );
};

const AddKeyboardForm = ({ closeKeyboardModal }: AddKeyboardFormProps) => {
  const { screen, setScreen } = useAddKeyboardContext();

  const incrementScreen = (e: any) => {
    e.preventDefault();
    setScreen(screen + 1);
  };

  const decrementScreen = (e: any) => {
    e.preventDefault();
    setScreen(screen - 1);
  };

  return (
    <div className="flex grow flex-col items-center pt-2">
      <ul className="steps text-sm">
        <li className="step step-success">Name and Imagery</li>
        <li className={`step ${screen >= 2 && "step-success"}`}>Information</li>
        <li className={`step ${screen >= 3 && "step-success"}`}>Mods and Extra</li>
      </ul>
      <div className="form-control h-[23rem] w-full space-y-2 px-6 pb-2">
        {screen === 1 && <ScreenOne />}
        {screen === 2 && <ScreenTwo />}
      </div>
      <form method="dialog" className="flex w-full grow flex-row justify-between px-24 py-2">
        {screen === 1 ? (
          <button className="btn btn-neutral btn-sm" onClick={closeKeyboardModal}>
            cancel
          </button>
        ) : (
          <button className="btn btn-neutral btn-sm" onClick={decrementScreen}>
            prev page
          </button>
        )}
        {screen === 3 ? (
          <button className={`btn btn-success btn-sm`} onClick={() => {}}>
            save changes
          </button>
        ) : (
          <button className={`btn btn-success btn-sm`} onClick={incrementScreen}>
            next page
          </button>
        )}
      </form>
    </div>
  );
};

const AddKeyboardModal = ({ open, setAddKeyboard }: AddKeyboardModalProps) => {
  const closeKeyboardModal = () => closeModal("addkeyboardmodal", () => setAddKeyboard(false));
  return (
    <dialog id="addkeyboardmodal" className="modal modal-middle" open={open}>
      <div className="modal-box flex w-[36rem] max-w-none flex-col bg-base-200 pb-4 pt-4">
        <div className="flex w-full grow flex-col">
          <h2 className="text-center font-clashgrotesk text-2xl font-medium">Add Keyboard</h2>
          <div className="w-full flex-grow flex-col">
            <AddKeyboardContextProvider>
              <AddKeyboardForm closeKeyboardModal={closeKeyboardModal} />
            </AddKeyboardContextProvider>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default AddKeyboardButton;
