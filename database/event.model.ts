import { Schema, model, models, Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true },
        slug: { type: String, unique: true },
        description: { type: String, required: true },
        overview: { type: String, required: true },
        image: { type: String, required: true },
        venue: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        mode: { type: String, required: true },
        audience: { type: String, required: true },
        agenda: { type: [String], required: true },
        organizer: { type: String, required: true },
        tags: { type: [String], required: true },
    },
    { timestamps: true }
);

// Pre-save hook for slug generation and date normalization
EventSchema.pre('save', async function () {
    // Generate slug if title is modified
    if (this.isModified('title')) {
        let slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        // Check for uniqueness
        const Event = this.constructor as any;
        let uniqueSlug = slug;
        let counter = 1;

        while (await Event.findOne({ slug: uniqueSlug, _id: { $ne: this._id } })) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }
        this.slug = uniqueSlug;
    }

    // Normalize date to ISO string
    if (this.isModified('date')) {
        const parsedDate = new Date(this.date);
        if (!isNaN(parsedDate.getTime())) {
            this.date = parsedDate.toISOString();
        }
    }
});

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;
