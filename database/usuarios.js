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

const alterarUsuario = (id, usuario) => {
    return prisma.usuarios.update({
        where: {
            id: id
        },
        data: usuario
    })
};

const deleteUsuario = (id) => {
    return prisma.usuarios.delete({
        where:{
            id: id
        }
    })
}

module.exports = {
    salvarUsuario,
    emailPorUsuario,
    idPorUsuario,
    alterarUsuario,
    deleteUsuario
}