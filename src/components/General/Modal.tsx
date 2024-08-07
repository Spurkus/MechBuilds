import { ModalButtonType, ModalThemeType } from "@/src/types/globalModal";
import classNames from "classnames";

export interface ModalType {
  open: boolean;
  title: string;
  message: string;
  theme: ModalThemeType;
  buttons: ModalButtonType[];
  toggleModal: () => void;
}

const RenderButton = (button: ModalButtonType, index: number, toggleModal: () => void) => {
  if (typeof button === "string")
    return (
      <button key={index} className="btn" onClick={toggleModal}>
        {button}
      </button>
    );

  return (
    <button
      key={index}
      className={classNames("btn", "btn-sm", "pb-10", {
        "btn-info": button.type === "info",
        "btn-success": button.type === "success",
        "btn-warning": button.type === "warning",
        "btn-error": button.type === "error",
        "btn-neutral": button.type === "neutral",
      })}
      onClick={button.onClick}
    >
      <span className="mt-[0.8rem]">{button.text}</span>
    </button>
  );
};

const Modal = ({ open, title, message, theme, buttons, toggleModal }: ModalType) => {
  return (
    <dialog id="globalmodal" className="modal modal-bottom sm:modal-middle" open={open}>
      <div
        className={classNames("modal-box", "flex", "flex-col", "items-center", {
          "modal-base": theme === "base",
          "modal-error": theme === "error",
          "modal-success": theme === "success",
          "modal-fail": theme === "fail",
        })}
      >
        <h3 className="text-4xl font-bold">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog" className="flex flex-row space-x-28">
            {buttons.map((button, index) => RenderButton(button, index, toggleModal))}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
