// arquivo que contém os serviços relativos à autenticação.
// métodos de autenticação do usuário.

const lodash = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./user');
const env = require('../../.env');

const emailRegex = /\S+@\S+\.\S+/
//regex para pedir senha com dígitos  letras minúsculas e maiúsculas, algum caracter especial e tamanho entre 6 e 20.
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

//metodo para tratar os erros de banco de dados.
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
      
    return res.status(400).json({errors})
}

//  método de login de authService.js
const login = (req, res, next) => {
    // a partir do request  pega o email e password do usuário.
    const email = req.body.email || ''
    const password = req.body.password || ''

    // raliza a busca dentro da coleção de usuários a partir do email informado no login.
    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)

            //caso o email existir então é feita a validacao para comparar a senha enviada na requisicao
            // com a senha do user que foi encontrado na busca. ( comparando os dados criptografados. )
        }   else if (user && bcrypt.compareSync(password, user.password)) {
                // se a senha for válida então gera um token para o usuário.
                const token = jwt.sign(user, env.authSecret, {
                    expiresIn: "1 day"
                })
                const { name, email } = user
                res.json({ name, email, token })
            }   else {
                    return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
                }
    })
}

//método para validar token
const validateToken = (req, res, next) => {
    // a partir do request  recebe o token do usuário.
    const token = req.body.token || ''

    // aplica a palavra chave em cima do token e caso a resposta nao tenha erro e ele retorne o token decodificado,
    //significa que o token está válido. 
    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({valid: !err})
    })
}
    
// método que realiza o cadastro do usuário.
const signup = (req, res, next) => {
    // recupera os campos da requisição.
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    // verifica se o email ( é válido ) combina com a regex
    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informado está inválido'] })
    }

    /* verifica se o senha ( é válida ) combina com a regex 
    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$ %) e tamanho entre 6 - 20."
            ]
        })
    }               */

    // gerando o hash do password.
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)

    // usa o metodo compareSync para comparar a senha passada com o hash que foi criado.
    // compareSync pega a string de confirmPassword e transforma em hash para fazer a comparação com o outro hash
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        // se a comparação for false envia a msg de erro.
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }

    // Após as validações de senha é realizada a validação p/ verificar se o novo usuário já existe na base de dados.
    User.findOne({ email }, (err, user) => {
        if (err) {
            console.log('entrou no erro')
            return sendErrorsFromDB(res, err)
        }   else if (user) {
                return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
            }   else {                        // name: name, email: email, password: passwordHash
                    const newUser = new User({ name, email, password: passwordHash })
                    console.log('entrou aki')
                    newUser.save(err => {
                        if (err) {
                            return sendErrorsFromDB(res, err)
                        }   else {
                                login(req, res, next)
                            }
                    })
                }
    })
}

module.exports = { login, signup, validateToken }
    