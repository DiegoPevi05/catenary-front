import React from "react";
import X from "../assets/images/svg/common/x.svg?react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="bg-transparent fixed top-0 left-0 h-full w-full flex items-center justify-center z-[120]">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[140]" style={{background: "rgba(0,0,0,0.1)"}} onClick={onClose}></div>
              <div
                className="relative top-0 bottom-0 left-0 right-0 bg-white lg:p-4 lg:rounded-lg shadow-lg max-lg:w-screen lg:min-w-96 h-screen lg:h-auto lg:overflow-y-auto z-[150] animation-element slide-in-up"
              > 
                <button className="absolute top-4 right-4 hover:text-tertiary" onClick={onClose}><X/></button>
                {children}
              </div>
        </div>
      )}
    </>
  );
};

export default Modal;
