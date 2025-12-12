import {API_BASE_URL} from "@env";
import axios from "axios";
import {Booking} from "./models";

class BookingService {
    private static instance: BookingService;
    private base = API_BASE_URL;

    static getInstance() {
        if (!BookingService.instance) BookingService.instance = new BookingService();
        return BookingService.instance;
    }

    async getBookById(id: string): Promise<Booking | null> {
        const res = await fetch(`${this.base}/bookings/bookingId/${id}`);
        if (res.status === 404) return null;
        return res.json();
    }

    async createBooking(payload: Omit<Booking, 'id'>): Promise<Booking> {
        try {
            const res = await axios.post(`${this.base}/create/booking`, payload, {
                timeout: 5000,
            });
            const newBooking = res.data;
            return newBooking;
        } catch (err: any) {
            console.log("Error in bookingService", {
                message: err.message,
                code: err.code,
                config: err.config?.url,
                stack: err.stack?.split("\n")[0],
            });
            throw err;
        }
    }
}

export const bookingService = BookingService.getInstance();