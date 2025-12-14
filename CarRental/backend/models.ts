export type Car = {
    id: string;
    brand: string;
    model: string;
    year: number;
    pricePerDay: number;
    available: boolean;
    imageUrl: string;
    description: string;
    features: {
        airConditioning: boolean;
        numberOfSeats: number;
        transmission: 'manual' | 'automatic';
        fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
    }
    extras: string[];
    location: {
        latitude: number;
        longitude: number;
        area: string;
    }
}

export type Booking = {
    id: string;
    userId: string;
    carId: string;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    totalCost: number; // -1 indicates not calculated yet
    pickUpLocation: string;
    deliveryLocation: string;
    payMethod: string;
}

export type TempBooking = {
    userId: string;
    carId: string;
    startDate: string;
    endDate: string;
    totalCost: number;
    pickUpLocation: string;
    deliveryLocation: string;
    payMethod: string;
}

export type BookingSearch ={
    startDate?: string;
    endDate?: string;
    pickUpLocation: string;
    deliveryLocation: string;
}

export type User = {
    id: string;
    name: string;
    password: string;
    email: string;
    phone: string;
    location: string;
}