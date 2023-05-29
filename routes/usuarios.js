const express = require("express");
const { salvarUsuario, emailPorUsuario, idPorUsuario } = require("../database/usuarios");
const bcrypt = require("bcrypt");
const { usuarios } = require("../database/prisma");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/registrar", async (req, res) => {
    try {
        const emailCadastrado = await emailPorUsuario(req.body.email)
        if(emailCadastrado) return res.status(400).json({
            message: "Este email já está cadastrado!"
        })
        const hashedSenha = bcrypt.hashSync(req.body.senha, 10);
        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: hashedSenha
        }
        const usuarioSalvo = await salvarUsuario(usuario);
        delete usuarioSalvo.senha;
        res.status(201).json({
            usuario: usuarioSalvo
        })
    } catch(error) {
        res.status(500).json({
            message: "Server error",
        })
    }
});

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const usuario =  await emailPorUsuario(email);
    if(!usuario) return res.status(401).send();
    const senhaUsuario = bcrypt.compareSync(senha, usuario.senha);
    if(!senhaUsuario) return res.status(401).send();
    const token = jwt.sign({
        idUsuario: usuario.id,
        nome: usuario.nome,
    }, process.env.SECRET);

    res.json({
        success: true,
        token,
    });
});

router.get("/profile", auth, async (req, res) => {
    const usuario = await idPorUsuario(req.usuario.idUsuario)
    res.json({
        usuario,
    });
});


module.exports = {
    router
};