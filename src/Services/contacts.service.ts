import { IContact, Contact } from "../models/contact.model";
import contactRepositorys from "../repositories/contact.repositorys";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { NextFunction } from "express";

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

export class contactsServices {
  
    getAll() {
        return contactRepositorys.getAll();
    }
    getByDocument(name: string){
        return contactRepositorys.getByDocument(name);
    }

    async create(contact: IContact){

        if(contact.password){
            contact.password = await bcrypt.hash(contact.password, 10);   
        }
        return contactRepositorys.create(contact);
    }

    async authorization(name: string, password: string){
        const contact = await contactRepositorys.getByDocument(name);
        if (!contact) throw new Error ('Usuário não encontrado!')

        const result = await bcrypt.compare(password, contact.password);

        if (result){
            return jwt.sign({ name: contact.name, _id: contact.id }, secretJWT, {
                expiresIn: '1h'
            });
        }

        throw new Error ('Falha na autenticação!')
    }

    remove(name: string){
        return contactRepositorys.remove(name);
    }

    update(name: String, contact: Partial<typeof Contact>){
      return contactRepositorys.update(name, contact);
    }

   
}

export default new contactsServices();