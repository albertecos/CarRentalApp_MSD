export type Booking = {
    id: string;
    userId: string;
    carId: string;
    startDate: string;
    endDate: string;
    totalCost: number;
}

class BookingService {
    private static instance: BookingService;
    private base = 'http://localhost:3000';
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
        const res = await fetch(`${this.base}/create/booking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return res.json();
    }
}

export const bookingService = BookingService.getInstance();