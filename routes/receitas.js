const express = require("express");
const { salvarReceita, todasReceitas, receitaId, alterarReceita, deletarReceita } = require("../database/receitas");
const auth = require("../middleware/auth");
const router = express.Router();
const z = require("zod");

const receitaSchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    tempo: z.string(),
})

router.get("/receitas", auth, async (req, res) => {
    try {
        const receitas = await todasReceitas(req.usuario.idUsuario)
        res.json({
            receitas
        });
    } catch (err) {
        if(err instanceof z.ZodError){
            return res.status(422).json({
                message: err.errors})
        } 
        res.status(500).json({
            message: "Server error" 
        });
    }
    
    
});

router.get("/receitas/:id", auth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const receita = await receitaId(id);
        res.json({
            receita
        })
    } catch (err) {
        if(err instanceof z.ZodError){
            return res.status(422).json({
                message: err.errors})
        } 
        res.status(500).json({
            message: "Server error" 
        });
    }

    
})

router.post("/receitas", auth, async (req, res) => {
    try {
        const novaReceita = receitaSchema.parse(req.body);
        const usuarioId = req.usuario.idUsuario;
        const receitaSalva = await salvarReceita(novaReceita, usuarioId)
        res.status(201).json({
            receita: receitaSalva
        })
    } catch (err) {
        if(err instanceof z.ZodError){
            return res.status(422).json({
                message: err.errors})
        } 
        res.status(500).json({
            message: "Server error" 
        });
    }
});

router.put("/receitas/:id", auth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const receita = receitaSchema.parse(req.body);
        const atualizarReceita = await alterarReceita(id, receita);
        res.json({
            receita: atualizarReceita
        });
    } catch (err) {
        if(err instanceof z.ZodError){
            return res.status(422).json({
                message: err.errors})
        } 
        res.status(500).json({
            message: "Server error" 
        });
    }
    
    
});

router.delete("/receitas/:id", auth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        await deletarReceita(id);
        res.status(204).send();
    } catch (err) {
        if(err instanceof z.ZodError){
            return res.status(422).json({
                message: err.errors})
        } 
        res.status(500).json({
            message: "Server error" 
        });
    }
    
    
});

module.exports = {
    router
}