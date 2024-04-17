// types.ts defines the different property type and the different options

export interface Property {
    id: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    price: number;
    size: number;
    status: string;
    imageUrl: string;
}

export interface FilterOptions {
    propertyType: string[];
    bedrooms: number[];
    bathrooms: number[];
    priceRange: {
        min: number;
        max: number;
    };
    size: {
        min: number;
        max: number;
    };
    status: string[];
}