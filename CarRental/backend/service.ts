import {Car, Booking, User} from "./models";

export class CarService {
    private cars: Car[] = [];
    private static instance: CarService;
    
    static getInstance(): CarService {
        if (!CarService.instance) {
            CarService.instance = new CarService();
        }
        return CarService.instance;
    }

    private constructor() {
        // Load dummy data from TypeScript file
        this.cars = require('./data/cars').cars;
    }
    
    getAllCars(): Car[] {
        return this.cars;
    }
    
    getCarById(id: string): Car | undefined {
        return this.cars.find(car => car.id === id);
    }
}

export class BookingService {
    private bookings: Booking[] = [];
    private static instance: BookingService;
    
    static getInstance(): BookingService {
        if (!BookingService.instance) {
            BookingService.instance = new BookingService();
        }
        return BookingService.instance;
    }

    private constructor() {
        // Load dummy data from TypeScript file
        this.bookings = require('./data/bookings').bookings;
    }

    getMyBookings(userId: string): Booking[] {
        return this.bookings.filter(booking => booking.userId === userId);
    }
    
    getBookingById(id: string): Booking | undefined {
        return this.bookings.find(booking => booking.id === id);
    }

    createBooking(booking: Booking): Booking {
        this.bookings.push(booking);
        return booking;
    }
}

export class UserService {
    private users: User[] = [];
    private static instance: UserService;
    private currentUser: User | null = null;
    
    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    private constructor() {
        // Load dummy data from TypeScript file
        this.users = require('./data/users').users;
        this.currentUser = this.users[0]; // Simulate logged-in user
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}