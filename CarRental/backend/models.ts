export type Car = {
    id: string;
    make: string;
    model: string;
    year: number;
    pricePerDay: {
        weekday: number;
        weekend: number;
        holiday: number;
    }
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
    location: string;
}

export type Booking = {
    id: string;
    carId: string;
    userId: string;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    totalCost: number; // -1 indicates not calculated yet
}

export type User = {
    id: string;
    name: string;
    password: string;
}