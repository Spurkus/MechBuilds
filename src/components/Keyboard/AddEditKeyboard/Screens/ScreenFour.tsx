import ModsField from "../ModsField";
import DescriptionField from "../DescriptionField";
import StatusField from "../StatusField";

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
