import {Schema} from 'mongoose';
import database from '../config/database';
import mongoose from 'mongoose';


export interface IUsuario {
    name: string;
    email: String;
    password: String;
    age?: number;
    createdAt: string | Date;
    }

    export const usuarioSchema = new Schema <IUsuario>({
        name: {
            type: String
        },
       
        email: {
            type: String
        },
        password:{

            type: String
        },
        age: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    
    });

    export const Usuario = mongoose.model<IUsuario>('Usuario', usuarioSchema);