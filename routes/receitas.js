const express = require("express");
const { salvarReceita, todasReceitas, receitaId, alterarReceita, deletarReceita } = require("../database/receitas");
const auth = require("../middleware/auth");
const router = express.Router();
const z = require("zod");

const receitaSchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    tempo: z.string(),
    usuarioId: z.number().min(0)
})

router.get("/receitas", auth, async (req, res) => {
    const receitas = await todasReceitas()
    res.json({
        receitas
    });
});

router.get("/receitas/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const receita = await receitaId(id);
    res.json({
        receita
    })
})

router.post("/receitas", auth, async (req, res) => {
    try {
        const NovaReceita = receitaSchema.parse(req.body);
        const receitaSalva = await salvarReceita(NovaReceita)
        res.json({
            receita: receitaSalva
        })
    } catch (err) {
        if(err instanceof z.ZodError) return res.status(422).json({message: err.errors})
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/receitas/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const receita = receitaSchema.parse(req.body);
    const atualizarReceita = await alterarReceita(id, receita);
    res.json({
        receita: atualizarReceita
    })
});

router.delete("/receitas/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    await deletarReceita(id);
    res.status(204).send();
});

module.exports = {
    router
}