import SwitchesField from "../SwitchesField";
import StabilizersField from "../StabilizersField";
import KeycapsField from "../KeycapsField";

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
