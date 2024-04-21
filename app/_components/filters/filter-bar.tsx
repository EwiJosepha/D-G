// import React from 'react';
// import PropertyTypeFilter from './property-type';
// import BedBathFilter from './bed-bathrooms';
// import PriceRangeFilter from './price-range';
// import PropertySizeFilter from './property-size';
// import StatusFilter from './status-filter';
// import { BsFilter } from 'react-icons/bs';


// const FilterBar: React.FC<{ applyFilter: (filterType: string, value: any) => void }> = ({ applyFilter }) => {

//     const handleApplyFilter = (filterType: string, value: any) => {
//         applyFilter(filterType, value);
//     };



//     return (
//         <div className='bg-gray-100 pt-6 pb-3'>
//             <h1 className='text-blue ml-[16%] font-mono flex items-center'> <BsFilter className='mr-2 text-2xl' /> FILTER BY:</h1>
//             <div className="container mx-auto mt-3 mb-2 items-center justify-start md:mx-auto md:w-[67%] flex">
//                 {/* Filter buttons and dropdowns */}
//                 {/* applyFilter={handleApplyFilter} */}
//                 <PropertyTypeFilter />
//                 <BedBathFilter applyFilter={handleApplyFilter} />
//                 <PriceRangeFilter />
//                 <PropertySizeFilter />
//                 <StatusFilter />
//             </div>
//         </div>
//     );
// };

// export default FilterBar;


// import Card from "../organisms/card";
// const CardData: React.FC= ()=> {
//     return (
//         <>
//             <div className="container mx-auto mt-4 mb-6 items-center justify-center md:mx-auto md:w-3/4 lg:w-2/3">

//                     <>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 object-cover">
//                                 <div>
//                                     <Card
//                                         key={i}
//                                         id={prop.id}
//                                         name={prop.name}
//                                         type={prop.type}
//                                         rooms={prop.rooms}
//                                         description={prop.description}
//                                         bath={prop.bath}
//                                         livingRooms={prop.livingRooms}
//                                         location={prop.location}
//                                         price={prop.price}
//                                         areaInKm={prop.areaInKm}
//                                         rentOrSale={prop.rentOrSale}
//                                         shortDescription={prop.shortDescription}
//                                         images={prop.images}
//                                         agentId={prop.agentId}
//                                     // onToggleFavorite={toggleFavorite}
//                                     />
//                                 </div>
//                         </div>
//                     </>


//                 <div className="flex items-center justify-center">
//                   <h1 className=" my-10 text-2xl font-extrabold text-red-500 animate-bounce">The search is not yet available. Contact D&J for your Personalised Assistance!</h1>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CardData;