import React from 'react';

interface ToastProps {
    message: string;
    visible: boolean;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="fixed top-4 inset-x-0 flex justify-center px-2 sm:px-0 z-50">
            <div className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm sm:text-base">
                <span className="truncate">{message}</span>
                <button onClick={onClose} className="text-xs sm:text-sm underline">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Toast;
