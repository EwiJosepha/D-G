import { useState } from 'react';

const PropertyTypeFilter: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');

    const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse'];

    const handleApplyFilter = () => {
        // Apply selectedType filter
        // Update property listing based on the filter
        setIsModalOpen(false);
    };

    return (
        <div>
            <button className="bg-blue-500 text-black px-4 py-2 rounded mr-2 z-50" onClick={() => setIsModalOpen(true)}>
                Property Type
            </button>
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Select Property Type</h2>
                        <ul>
                            {propertyTypes.map((type) => (
                                <li key={type} className="mb-2">
                                    <button
                                        className={`w-full text-left py-2 px-4 rounded ${selectedType === type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        onClick={() => setSelectedType(type)}
                                    >
                                        {type}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleApplyFilter}>
                                Apply
                            </button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyTypeFilter;
