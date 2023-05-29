const express = require("express");
const { salvarReceita, todasReceitas, receitaId, alterarReceita, deletarReceita } = require("../database/receitas");
const auth = require("../middleware/auth");
const router = express.Router();


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
    const NovaReceita = {
    nome: req.body.nome,
    descricao: req.body.descricao,
    tempo: req.body.tempo,
    usuarioId: req.body.usuarioId
    }
    const receitaSalva = await salvarReceita(NovaReceita)
    res.json({
        receita: receitaSalva
    })
});

router.put("/receitas/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const receita = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        tempo: req.body.tempo
    }
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