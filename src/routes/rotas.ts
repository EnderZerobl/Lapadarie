import { Router, Request, Response } from 'express';
import { prisma } from '../app';
import { request } from 'http';

const router = Router();


// CRUD BÁSICO

//Função para calcular o total de pães

let totalPaesVendidos = 0;

const inicializarTotalPaesVendidos = async () => {
    try {
        const usuarios = await prisma.user.findMany();
        totalPaesVendidos = usuarios.reduce((total, user) => total + user.paes, 0);
    } catch (error) {
        console.error('Erro ao inicializar total de pães vendidos:', error);
    }
};

inicializarTotalPaesVendidos();

const calcularTotalPaes = async () => {
    return totalPaesVendidos;
};
//Função para saber o povo nas filas

const Fila = async () => {
    const us = await prisma.user.findMany();
    return us.length;
};

//Criar Usuários

router.post('/', async (req: Request, res: Response) => {
    const { nome, paes } = req.body;

    try {
        const novoUsuario = await prisma.user.create({
            data: {
                nome,
                paes
            }
        });

        /* const totalPaes = await calcularTotalPaes(); */
        totalPaesVendidos += paes; 
        const preco = paes * 0.50

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso',
            usuario: novoUsuario,
            preco
        });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário' });
    }
});

//Deletar Usuário por Id

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const us = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (us) {
            const deletado = await prisma.user.delete({ where: { id: Number(req.params.id) } })
             return res.json({
                message: 'Sucesso: Cpf Cancelado',
                deletado
            });
        } else {
            res.status(404).json({ error: 'Quer terminar com o que nem começou?' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' }); 
    }
});

//Atualizar usuário por Id

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;  
    const { nome, paes} = req.body;


    try {
        const us = await prisma.user.findUnique({ where: { id: Number(id) } });

        if (us) {
            const updates = await prisma.user.update({
                where: { id: Number(id) },  
                data: {
                    nome, 
                    paes
                }
            });
            return res.json({
                message: 'Sucesso: Usuário Atualizado',
                updates
            }); 
        } else {
            res.status(404).json({ error:'Acho que você quer atualizar demais' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

//Mostra o Banco existente

router.get('/usuarios', async(req:Request, res:Response) => {

    try {
        const usuarios = await prisma.user.findMany()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json("Sem nada no banco")
    }

})

router.get('/totais', async (req: Request, res: Response) => {
    try {
        const totalPaes = await calcularTotalPaes(); 
        const pessoas = await Fila();
        const precototal = totalPaes * 0.50
        res.json({ totalPaes , precototal, pessoas}); 
    } catch (error) {
        res.status(500).json({ error: 'Erro ao calcular total de pães' });
    }
});



export default router;