import React from 'react';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const Popup: React.FC<PopupProps> = ({ open, onClose, onDelete }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">Are you sure you want to delete this listing?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => {
                            onDelete();
                            onClose();
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
