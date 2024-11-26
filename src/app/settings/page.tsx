"use client";
import { useState } from "react";
import classNames from "classnames";
import NeedsAuthentication from "@/src/context/NeedsAuthentication";
import ProfileDetails from "@/src/components/ProfileDetails/ProfileDetails";
import AccountSettings from "./AccountSettings";
import BillingAndPlansSettings from "./BillingAndPlansSettings";

type SettingsType = "Account" | "Billing and Plans";

const SettingsMenu = ({ setSettings }: { setSettings: (settings: SettingsType) => void }) => {
  return (
    <div className="flex grow flex-col">
      <ul className="menu flex grow rounded-[1.25rem] bg-base-300 text-base [&_li>*]:rounded-xl">
        <h1 className="ml-2 mt-1 p-1 font-clashgrotesk text-4xl font-medium">Settings</h1>
        <li onClick={() => setSettings("Account")}>
          <a>Account</a>
        </li>
        <li onClick={() => setSettings("Billing and Plans")}>
          <a>Billing and Plans</a>
        </li>
      </ul>
    </div>
  );
};

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>("Account");

  return (
    <NeedsAuthentication>
      <div className="p-2 lg:w-[15rem]">
        <SettingsMenu setSettings={setSettings} />
      </div>
      <div className="flex grow flex-col sm:flex-row">
        {settings === "Account" && (
          <div className="p-2 sm:order-last sm:w-[17.5rem]">
            <ProfileDetails />
          </div>
        )}
        <div className={classNames("flex", "grow", "p-2", settings === "Account" ? "lg:w-[25rem]" : "lg:w-[45rem]")}>
          <div className="flex grow flex-col space-y-2 rounded-[2rem] bg-base-300 p-6">
            {settings === "Account" && <AccountSettings />}
            {settings === "Billing and Plans" && <BillingAndPlansSettings />}
          </div>
        </div>
      </div>
    </NeedsAuthentication>
  );
};

export default Settings;
