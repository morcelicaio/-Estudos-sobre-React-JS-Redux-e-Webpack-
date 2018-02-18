//Configurando as rotas da aplicação.

const express = require('express')
const auth = require('./auth')

module.exports = function(server){                   
    /* dividindo os web services em dois grupos.  Grupos que estão dentro de uma api protegida (protected api), 
       ou seja, essas rotas vão ter que passar pelo filtro de autenticação.   E por outro lado teremos as rotas 
       públicas ( por exemplo  a rota de login,  rota de cadastrar (signup),  verificarToken ) .   */   
       
        // rotas protegidas por token JWT.
       const protectedApi = express.Router();
       server.use('/api', protectedApi);

       protectedApi.use(auth); //passando o filtro de autenticação para as rotas protegidas.

       //Rotas relacionadas ao ciclo de pagamento.
        const BillingCycle = require('../api/billingCycle/billingCycleService')
        BillingCycle.register(protectedApi, '/billingCycles')

        // rotas públicas.
        const opendApi = express.Router();
        server.use('/oapi', opendApi);

        // colocando os métodos relativos à parte de autenticação.
        const AuthService = require('../api/user/authService');
        opendApi.post('/login', AuthService.login);
        opendApi.post('/signup', AuthService.signup);
        opendApi.post('/validateToken', AuthService.validateToken);
}