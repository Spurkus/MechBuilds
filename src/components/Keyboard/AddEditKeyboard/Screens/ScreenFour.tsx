import ModsField from "../Fields/ModsField";
import DescriptionField from "../Fields/DescriptionField";
import StatusField from "../Fields/StatusField";

const ScreenFour = () => {
  return (
    <>
      <ModsField />
      <hr className="border-t border-gray-700" />
      <DescriptionField />
      <StatusField />
    </>
  );
};

export default ScreenFour;
