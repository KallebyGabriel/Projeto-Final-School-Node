import { Request, Response, Router } from "express";
import contactsService from "../Services/contacts.service";
import { authorizationMiddleware } from "../middlewares/authorization.middlewares";
const router = Router();

function ValidateEmail(email: string) 
{
 if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
  {
    return (true)
  }
    return (false)
}
router.get('/', async (req: Request, Res: Response) => {
    const contacts = await contactsService.getAll();
    Res.send(contacts);
});

router.get('/:name', authorizationMiddleware, async (req: Request, res: Response) => {
    const contact = await contactsService.getByDocument(req.params.name);
    if (!contact) return res.status(400).send({message: "Contato não encontrado!"})
    res.status(200).send(contact);
})

router.post('/', authorizationMiddleware, async (req: Request, Res: Response) => {

    if (ValidateEmail(req.body.email)){
        return Res.status(400).send({message: 'E-mail Invalido!'})

    }
    await contactsService.create(req.body)
    Res.status(201).send({message: "Contato salvo com sucesso!"});

})

router.post('/authorization', async (req: Request, res: Response) => {
    try{
        const token = await contactsService.authorization(req.body.name, req.body.password);
        res.status(200).send( {token} );
    }catch (error: any){
        res.status(401).send({message: error.message});
    }
})

router.delete('/remove/:name/', authorizationMiddleware, async (req: Request, res: Response) => {
    try{
       await contactsService.remove(req.params.name);
        res.status(200).send({message: "Contato removido com sucesso!"})
    }catch(error: any){
        res.status(400).send({message: error.message});
    }   
});

router.put('/:name', authorizationMiddleware, async (req: Request, res: Response) => {
   try{ 
       await contactsService.update(req.params.name, req.body);
        res.status(200).send({message: "Contato atualizado com sucesso!"});
   }catch(error: any){
    res.status(400).send({message: error.message});
   }

})

export default router;