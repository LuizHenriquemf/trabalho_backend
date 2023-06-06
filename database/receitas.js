const prisma = require("./prisma");

const todasReceitas = (usuarioId) => {
    return prisma.receitas.findMany({
        where: {
            usuarioId
        }
    });
}

const receitaId = (id) => {
    return prisma.receitas.findFirst({
        where: {
            id
        }
    })
}

const salvarReceita = (receita, usuarioId) => {
    return prisma.receitas.create({
        data: {
            nome: receita.nome,
            descricao: receita.descricao,
            tempo: receita.tempo,
            usuarioId: usuarioId
        }
    })
}

const alterarReceita = (id, receita) => {
    return prisma.receitas.update({
        where: {
            id: id
        },
        data: receita
    })
}

const deletarReceita = (id) => {
    return prisma.receitas.delete({
        where: {
            id: id
        }
    })
}

module.exports = {
    salvarReceita,
    todasReceitas,
    receitaId,
    alterarReceita,
    deletarReceita
}