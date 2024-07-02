import { useState, useEffect } from "react";
import { useAddKeyboardContext } from "@/src/context/AddKeyboardContext";
import { useGlobalThemeContext } from "@/src/context/GlobalTheme";
import { formatSocialLink, closeDropdown } from "@/src/helper/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface CheckBoxFieldProps {
  name: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InputNameFieldProps {
  type: string;
  name: string;
  validName: boolean;
  namePlaceholder: string;
  nameMaxLength: number;
  noInput: boolean;
  nameChange: (e: any) => void;
}

interface InputNameDropdownFieldProps {
  type: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  validName: boolean;
  namePlaceholder: string;
  nameMaxLength: number;
  noInput: boolean;
  nameChange: (e: any) => void;
  dropdown?: boolean;
  list?: string[];
}

interface InputNameLinkFieldProps {
  type: string;
  selectedLink: boolean;
  setSelectedLink: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  namePlaceholder: string;
  nameMaxLength: number;
  validName: boolean;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  validLink: boolean;
  noInput: boolean;
  fieldSelect: boolean | null;
  dropdown?: boolean;
  list?: string[];
}

export const CheckBoxField = ({ name, checked, setChecked }: CheckBoxFieldProps) => {
  const { kitSelected } = useAddKeyboardContext();
  const { theme } = useGlobalThemeContext();
  const isLight = theme === "light";
  const kitNoInput = !kitSelected || kitSelected === null;
  const toggleChecked = () => {
    if (kitNoInput) return;
    setChecked(!checked);
  };

  useEffect(() => {
    if (kitSelected) return;
    setChecked(false);
  }, [kitSelected, setChecked]);

  return (
    <div className="flex flex-row justify-between space-x-1.5 pb-1">
      <button
        className={`btn ${isLight ? "btn-active" : "btn-neutral"} ${kitNoInput && "btn-disabled"} btn-sm gap-1.5 px-2.5`}
        onClick={toggleChecked}
        disabled={kitNoInput}
      >
        <span>{name}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          className="checkbox checkbox-sm"
        />
      </button>
    </div>
  );
};

export const InputNameField = ({
  type,
  name,
  validName,
  namePlaceholder,
  nameMaxLength,
  noInput,
  nameChange,
}: InputNameFieldProps) => {
  return (
    <input
      type="text"
      placeholder={namePlaceholder}
      maxLength={nameMaxLength}
      className={`mr-2 grow truncate rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
        noInput && "input-disabled"
      } ${name && "font-medium"} ${validName || !name ? "bg-base-200" : "bg-input-error"}`}
      disabled={noInput}
      id={`${type}name`}
      autoComplete="off"
      onChange={nameChange}
      value={name}
    />
  );
};

export const InputNameDropdownField = ({
  type,
  name,
  setName,
  validName,
  namePlaceholder,
  nameMaxLength,
  noInput,
  nameChange,
  dropdown = false,
  list = [],
}: InputNameDropdownFieldProps) => {
  const nameListChange = (nameList: string) => {
    if (noInput) return;
    setName(nameList);
    closeDropdown();
  };
  return (
    <div className="dropdown dropdown-end h-full w-full">
      <div tabIndex={0} role="button" className="flex h-full w-full grow flex-col">
        <InputNameField
          type={type}
          name={name}
          validName={validName}
          namePlaceholder={namePlaceholder}
          nameMaxLength={nameMaxLength}
          noInput={noInput}
          nameChange={nameChange}
        />
      </div>
      {dropdown && (
        <ul
          tabIndex={0}
          className={`${noInput && "hidden"} menu dropdown-content menu-sm z-[3] mr-1.5 mt-2 w-[98%] rounded-xl border border-white bg-base-100 p-[0.3rem] shadow`}
        >
          {list.map((nameList, index) => (
            <li key={index} onClick={() => nameListChange(nameList)}>
              <a className="w-full font-bold">{nameList}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const InputNameLinkField = ({
  type,
  selectedLink,
  setSelectedLink,
  name,
  setName,
  namePlaceholder,
  nameMaxLength,
  validName,
  link,
  setLink,
  validLink,
  noInput,
  fieldSelect,
  dropdown = false,
  list = [],
}: InputNameLinkFieldProps) => {
  const { kitSelected, kitName } = useAddKeyboardContext();
  const [linkFocused, setLinkFocused] = useState(false);
  const buttonError = (selectedLink && !validName && name) || (!selectedLink && !validLink && link);

  // Preventing input when kit is not selected
  const selectLink = () => {
    if (noInput) return;
    setSelectedLink(!selectedLink);
  };
  const nameChange = (e: any) => {
    if (noInput) return;
    setName(e.target.value);
  };
  const linkChange = (e: any) => {
    if (noInput) return;
    setLink(e.target.value);
  };

  useEffect(() => {
    setSelectedLink(false);
  }, [fieldSelect, setSelectedLink]);

  useEffect(() => {
    if (kitSelected && fieldSelect) {
      setLink("");
      setName(kitName);
    } else if (!kitSelected) {
      setLink("");
      setName("");
    }
  }, [kitSelected, fieldSelect, setName, setLink, kitName]);

  return (
    <div className="flex flex-row">
      {selectedLink ? (
        <input
          type="text"
          placeholder="www.example.com"
          id={`${type}link`}
          maxLength={100}
          className={`mr-2 grow truncate rounded-lg border border-gray-400 p-1 pl-2.5 text-sm focus:border-white ${
            noInput && "input-disabled"
          } ${validLink || !link ? "bg-base-200" : "bg-input-error"}`}
          disabled={noInput}
          autoComplete="off"
          onFocus={() => setLinkFocused(true)}
          onBlur={() => setLinkFocused(false)}
          onChange={linkChange}
          value={linkFocused ? link : formatSocialLink(link)}
        />
      ) : dropdown ? (
        <InputNameDropdownField
          type={type}
          name={name}
          setName={setName}
          validName={validName}
          namePlaceholder={namePlaceholder}
          nameMaxLength={nameMaxLength}
          noInput={noInput}
          nameChange={nameChange}
          dropdown={dropdown}
          list={list}
        />
      ) : (
        <InputNameField
          type={type}
          name={name}
          validName={validName}
          namePlaceholder={namePlaceholder}
          nameMaxLength={nameMaxLength}
          noInput={noInput}
          nameChange={nameChange}
        />
      )}
      <button
        className={`btn btn-square btn-outline btn-sm self-center rounded-lg ${buttonError && "text-error"} ${noInput && "input-disabled"} ${selectedLink ? "btn-active" : ""}`}
        disabled={noInput}
        onClick={selectLink}
      >
        <FontAwesomeIcon
          icon={faLink}
          className={`ml-[0.1rem] mt-[0.1rem] ${buttonError && "text-error"}`}
        />
      </button>
    </div>
  );
};
