import { useAddEditKeyboardContext } from "@/src/context/AddEditKeyboardContext";
import { InputNameLinkField } from "./InputFields";

const CaseField = () => {
  const {
    kitCase,
    caseName,
    setCaseName,
    validCaseName,
    caseLink,
    setCaseLink,
    validCaseLink,
    caseSelectedLink,
    setCaseSelectedLink,
    kitSelected,
  } = useAddEditKeyboardContext();
  const kitInitial = kitSelected === null;
  return (
    <div className="flex flex-col">
      <label className={`label pb-0 pt-0 font-bold ${kitCase && "text-gray-500"}`}>
        Case {caseSelectedLink ? "Link (Optional)" : "Name"}
      </label>
      <InputNameLinkField
        type="case"
        selectedLink={caseSelectedLink}
        setSelectedLink={setCaseSelectedLink}
        name={caseName}
        setName={setCaseName}
        namePlaceholder="KBDfans Tofu65"
        nameMaxLength={50}
        validName={validCaseName}
        link={caseLink}
        setLink={setCaseLink}
        validLink={validCaseLink}
        noInput={kitInitial || kitCase}
        fieldSelect={kitCase}
      />
    </div>
  );
};

export default CaseField;
