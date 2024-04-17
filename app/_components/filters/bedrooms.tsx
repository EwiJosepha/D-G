import { useState, useEffect, useRef } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const BedroomFilter: React.FC = () => {
    const [numRooms, setNumRooms] = useState(0);

    const handleIncrement = () => {
        setNumRooms((prevNumRooms) => prevNumRooms + 1);
    };

    const handleDecrement = () => {
        if (numRooms > 0) {
            setNumRooms((prevNumRooms) => prevNumRooms - 1);
        }
    };

    return (
        <div>
            <button className="bg-blue-500 text-black px-4 py-2 rounded mr-2" onClick={handleDecrement}>
                <FaMinus />
            </button>
            <span>{numRooms} Rooms</span>
            <button className="bg-blue-500 text-black px-4 py-2 rounded ml-2" onClick={handleIncrement}>
                <FaPlus />
            </button>
        </div>
    );
};

export default BedroomFilter;
