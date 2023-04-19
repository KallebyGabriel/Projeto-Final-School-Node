import { Request, Response, Router } from "express";
import usuarioService from "../Services/usuario.service";
import { Usuario } from "../models/usuario.model";
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
        const usuario = await usuarioService.getAll();
    Res.send(usuario);

});

router.get('/:email', async (req: Request, res: Response) => {
    const usuario = await usuarioService.getByDocument(req.params.email);
    if (!usuario) return res.status(400).send({message: "Usuário não encontrado!"})
    res.status(200).send(usuario);
})

router.post('/', async (req: Request, Res: Response) => {
    console.log(usuarioService);

    if (ValidateEmail(req.body.email)){
        return Res.status(400).send({message: 'E-mail Invalido!'})

    }
     await usuarioService.create(req.body)
    Res.status(201).send({message: "Usuário salvo com sucesso!"});

})

router.delete('/remove/:email/', async (req: Request, res: Response) => {
    try{
      await usuarioService.remove(req.params.email);
        res.status(200).send({message: "Usuário removido com sucesso!"})
    }catch(error: any){
        res.status(400).send({message: error.message});
    }   
});

router.put('/:email', async (req: Request, res: Response) => {
   try{ 
       await usuarioService.update(req.params.email, req.body);
        res.status(200).send({message: "Usuário atualizado com sucesso!"});
   }catch(error: any){
    res.status(400).send({message: error.message});
   }

})

export default router;