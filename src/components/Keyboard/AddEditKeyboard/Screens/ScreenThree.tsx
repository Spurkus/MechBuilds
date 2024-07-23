import SwitchesField from "../Fields/SwitchesField";
import StabilizersField from "../Fields/StabilizersField";
import KeycapsField from "../Fields/KeycapsField";

const ScreenThree = () => {
  return (
    <>
      <SwitchesField />
      <hr className="border-t border-gray-700" />
      <StabilizersField />
      <hr className="border-t border-gray-700" />
      <KeycapsField />
    </>
  );
};

export default ScreenThree;
