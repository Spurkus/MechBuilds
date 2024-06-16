import { ModalButtonType, ModalThemeType } from "../context/GlobalModal";

export interface ModalType {
  open: boolean;
  title: string;
  message: string;
  theme: ModalThemeType;
  buttons: ModalButtonType[];
  toggleModal: () => void;
}

const renderButton = (
  button: ModalButtonType,
  index: number,
  toggleModal: () => void,
) => {
  if (typeof button === "string") {
    return (
      <button key={index} className="btn" onClick={toggleModal}>
        {button}
      </button>
    );
  } else {
    return (
      <button
        key={index}
        className={`btn btn-${button.type}`}
        onClick={button.onClick}
      >
        {button.text}
      </button>
    );
  }
};

const Modal = ({
  open,
  title,
  message,
  theme,
  buttons,
  toggleModal,
}: ModalType) => {
  return (
    <dialog
      id="global_modal"
      className={`modal modal-bottom sm:modal-middle`}
      open={open}
    >
      <div className={`modal-${theme} modal-box`}>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            {buttons.map((button, index) =>
              renderButton(button, index, toggleModal),
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
