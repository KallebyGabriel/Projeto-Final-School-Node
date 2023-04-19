import { IUsuario, Usuario } from "../models/usuario.model";
import usuarioRepositorys from "../repositories/usuario.repositorys";
import dotenv from 'dotenv';
import { NextFunction } from "express";

dotenv.config();

export class usuarioServices {
  
    getAll() {
        return usuarioRepositorys.getAll();
    }
    getByDocument(email: string){
        return usuarioRepositorys.getByDocument(email);
    }

    create(usuario: typeof Usuario){

        return usuarioRepositorys.create(usuario);
    }

    remove(email: string){
        return usuarioRepositorys.remove(email);
    }

    update(email: string, usuario: Partial<typeof Usuario>){
      return usuarioRepositorys.update(email, usuario);
    }

   
}

export default new usuarioServices();