import {Usuario} from '../models/usuario.model'

class usuarioRepository{

    getAll(){
        return Usuario.find();
    }
    getByDocument(email: string){
        return Usuario.find({email: email});
    }
    create(usuario: typeof Usuario) {
        return Usuario.create(usuario);
    }
    update(email: string, usuario: Partial<typeof Usuario>){
        return Usuario.updateOne({ email: email }, {$set: usuario});
    }
    remove(email: string){
        return Usuario.deleteOne({email: email});
    }
}

export default new usuarioRepository();