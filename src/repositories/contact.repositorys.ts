import { Contact, IContact } from "../models/contact.model";

class contactRepository {

    getAll(){
        return Contact.find();
    }

    getByDocument(name: string) {
        return Contact.findOne({ name: name});
    }

    create(contact:IContact){
        return Contact.create(contact);
    }

    update(name: String, contact: Partial<typeof Contact>) {
        return Contact.updateOne({name: name}, {$set: contact});
    }
    remove(name: string){
        return Contact.deleteOne({name: name});
    }
}

export default new contactRepository();