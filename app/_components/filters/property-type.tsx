import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const PropertyTypeFilter: React.FC = () => {
    const [selectedType, setSelectedType] = useState('');
    const [appliedType, setAppliedType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const propertyTypes = ['Apartment', 'Studio', 'Villa', 'SelfContain'];

    const handleApplyFilter = () => {
        setAppliedType(selectedType);
        setIsModalOpen(false);
    };

    const handleCancelFilter = () => {
        setAppliedType('');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.body.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            {!appliedType && (
                <button className="text-blue px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500" onClick={() => setIsModalOpen(true)}>
                    Property Type
                </button>
            )}
            {appliedType && (
                <div className=" items-center">
                    <button className="text-blue px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={handleCancelFilter}>
                        {appliedType} <FaTimes className="ml-2 text-xl" />
                    </button>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div ref={modalRef} className="bg-white p-4 rounded-lg">
                        <h2 className="text-sm font-semibold mb-4">Property Type</h2>
                        <ul>
                            {propertyTypes.map((type) => (
                                <li key={type} className="mb-2">
                                    <button
                                        className={`w-full text-left py-2 px-4 rounded ${selectedType === type ? 'bg-sky-200 text-black' : 'bg-gray-100'}`}
                                        onClick={() => setSelectedType(type)}
                                    >
                                        {type}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end mt-4">
                            <button className="bg-blue text-white w-full px-4 py-2 rounded mr-2" onClick={handleApplyFilter}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyTypeFilter;
