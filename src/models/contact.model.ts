import {Schema} from 'mongoose';
import database from '../config/database';
import mongoose from 'mongoose';

export interface IContact {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    createdAt: string | Date;
}

    export const contactSchema = new Schema <IContact>({
        name: {
            type: String
        },
        lastName: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        },
        password:{

            type: String
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    
    });

    export const Contact = mongoose.model<IContact>('Contact', contactSchema);