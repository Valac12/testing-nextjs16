import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

export interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
        email: { type: String, required: true },
    },
    { timestamps: true }
);

// Pre-save hook for validation
BookingSchema.pre('save', async function () {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
        throw new Error('Invalid email format');
    }

    // Verify that the referenced event exists
    if (this.isModified('eventId')) {
        const eventExists = await Event.findById(this.eventId);
        if (!eventExists) {
            throw new Error('Event not found');
        }
    }
});

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
