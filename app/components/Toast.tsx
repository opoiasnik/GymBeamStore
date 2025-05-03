import React from 'react';

interface ToastProps {
    message: string;
    visible: boolean;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="fixed top-4 inset-x-0 flex justify-center z-50">
            <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg">
                {message}
                <button onClick={onClose} className="ml-4 text-sm underline">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Toast; 