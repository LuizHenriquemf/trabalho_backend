const prisma = require("./prisma");

const emailPorUsuario = (email) => {
    return prisma.usuarios.findUnique({
        where: {
            email,
        },
    });
};

const idPorUsuario = (id) => {
    return prisma.usuarios.findUnique({
        select: {
            id: true,
            nome: true,
            email: true,
            senha: false,
        },
        where: {
            id,
        },
    });
};

const salvarUsuario = (usuario) => {
    return prisma.usuarios.create({
        data: usuario
    });
};

module.exports = {
    salvarUsuario,
    emailPorUsuario,
    idPorUsuario
}