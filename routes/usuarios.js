const express = require("express");
const { salvarUsuario, emailPorUsuario, idPorUsuario } = require("../database/usuarios");
const bcrypt = require("bcrypt");
const { usuarios } = require("../database/prisma");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const z = require("zod");
const router = express.Router();


const usuarioSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(6),
})

router.post("/registrar", async (req, res) => {
    try {
        const usuario = usuarioSchema.parse(req.body);
        const emailCadastrado = await emailPorUsuario(usuario.email)
        if(emailCadastrado) return res.status(400).json({
            message: "Este email já está cadastrado!"
        })
        const hashedSenha = bcrypt.hashSync(req.body.senha, 10);
        usuario.senha = hashedSenha;
        const usuarioSalvo = await salvarUsuario(usuario);
        delete usuarioSalvo.senha;
        res.status(201).json({
            usuario: usuarioSalvo
        })
    } catch(err) {
        if(err instanceof z.ZodError) return res.status(422).json({message: err.errors});
        res.status(500).json({message: "Server error",});
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