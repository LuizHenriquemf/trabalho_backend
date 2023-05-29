const prisma = require("./prisma");

const todasReceitas = () => {
    return prisma.receitas.findMany();
}

const receitaId = (id) => {
    return prisma.receitas.findFirst({
        where: {
            id
        }
    })
}

const salvarReceita = (receita) => {
    return prisma.receitas.create({
        data: receita
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