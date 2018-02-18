/* criando um middleware responsável para verificar se o token veio a partir da requisicao.  
    verifica se o token foi gerado a partir da palavra chave contida no servidor (.env).

    E caso o token ñ esteja válido ou não seja informado na requisição, e o usuário esteja tentando 
    acessar uma requisição que precisa passar por esse filtro, se não for válido, o filtro vai ignorar 
    essa requisição a vai informar uma mensagem de erro (um erro 403)
*/

const jwt = require('jsonwebtoken');
const env = require('../.env');

module.exports = ( req, res, next ) =>{
    // verificando se o serviço tem o CORS habilitado.
    // O CORS habilitado permite fazer uma requisição de uma origem diferente da origem em que o web service está
    // sendo disponibilizado.
    if(req.method === 'OPTIONS'){
         next();
    }   else{
            // recupera o token que vem na requisicao. Pode vir pelo body, query ou header
            const token = req.body.token || req.query.token || req.headers['authorization']

            // verifica se o token está presente
            if(!token){
                return res.status(403).send({ errors: ['No token provided.'] })
            } 
            
            //e caso o token existir, realiza a validação para ver se é um token válido.
            jwt.verify(token, env.authSecret, function(err, decoded) {
                if(err) {
                    return res.status(403).send({
                        errors: ['Failed to authenticate token.']
                    });

                }   else {
                        req.decoded = decoded;
                        next();
                    }
            });
                
                
        }
}