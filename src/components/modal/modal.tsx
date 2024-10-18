import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';
import ReactDOM from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg relative z-[100px]">
        <button
          onClick={onClose}
          className="absolute top-10 right-10 text-gray-500 hover:text-black"
        >
          <IoMdClose className="w-[20px] h-[20px]" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};
