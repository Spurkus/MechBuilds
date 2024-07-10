import KitField from "../KitField";
import SizeField from "../SizeField";
import PlateField from "../PlateField";
import CaseField from "../CaseField";
import PcbField from "../PcbField";

const ScreenTwo = () => {
  return (
    <>
      <KitField />
      <hr className="border-t border-gray-700" />
      <div className="flex flex-row justify-between space-x-3">
        <SizeField />
        <PlateField />
      </div>
      <CaseField />
      <PcbField />
    </>
  );
};

export default ScreenTwo;
