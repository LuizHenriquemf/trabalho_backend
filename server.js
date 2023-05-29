const express = require("express");
const receitasRoutes = require("./routes/receitas");
const usuariosRoutes = require("./routes/usuarios");
const healthRoutes = require("./routes/health");
const logger = require("./middleware/logger");

const server = express();
server.use(express.json());
server.use(logger)
server.use(healthRoutes.router);
server.use(receitasRoutes.router);
server.use(usuariosRoutes.router);


module.exports = {server}