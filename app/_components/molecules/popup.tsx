import React from 'react';

// interface PopupProps {
//     open: boolean;
//     onClose: () => void;
//     onDelete: () => void;
// }

const Popup: React.FC = () => {
    // if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <p className="mb-10 text-xl font-bold">Are you sure you want to delete this listing?</p>
                <div className="flex justify-between">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    // onClick={() => {
                    //     onDelete();
                    //     onClose();
                    // }}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-blue text-white px-4 py-2 rounded"
                    // onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
