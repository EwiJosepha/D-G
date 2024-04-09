import React, { useState } from 'react';

interface PopupProps {
    onClose: () => void;
    children: React.ReactNode;
}



const Popup: React.FC<PopupProps> = ({ onClose, children }) => {    const [openModal, setOpenModal] = useState(false)
    // if (!open) return null;

    function isModalOpen() {
        setOpenModal(true)
    }
    function isModalClose() {
        setOpenModal(false)
    }

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50" onClick={onClose}>
                <div className="bg-white p-10 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
};

export default Popup;
