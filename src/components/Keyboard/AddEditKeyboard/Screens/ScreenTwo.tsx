import KitField from "../Fields/KitField";
import SizeField from "../Fields/SizeField";
import PlateField from "../Fields/PlateField";
import CaseField from "../Fields/CaseField";
import PcbField from "../Fields/PcbField";

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
