/* Nesse reducer existe um detalhe a mais. Está sendo encapsulado dentro dele as alterações relativas ao local
   storage. O local storage faz parte da especificação do html5, como se fosse um espaço dentro do browser 
   onde se consegue armazenar informações. Ele substitui um pouco a ideia do cookie.  
   Está sendo armazenado dentro do local storage o usuário que será obtido a partir do login. 
   Quando alguém se logar o backend irá retornar um json que será o nome do usuário, o e-mail e o token. */

// chave que será armazenada no local storage.
const userKey = '_mymoney_user';

const INITIAL_STATE = {
    // O método JSON.parse() converte uma string p/ JSON, opcionalmente transformando o valor produzido por conversão.
    //user: {name: 'Caio', email: 'morcelicaio@hotmail.com'},  para funcionar sem o login
    user: JSON.parse( localStorage.getItem(userKey) ),
    validToken: false
};

export default (state = INITIAL_STATE, action ) => {
    switch(action.type){        
        case 'TOKEN_VALIDATED':
            if(action.payload){
                return { ...state, validToken: true }
            }   else{
                    // se o token nao for validado é removido o usuário que está no local storage.
                    // e é passado o user como null. E a partir desse momento que o estuda muda, automaticamente
                    // a aplicação vai para a tela de login.
                    localStorage.removeItem(userKey);
                    return { ...state, validToken: false, user: null }
                }

        // Se o usuário foi obtido, significa que ou ele já passou pelo método de signup (registrar-se), ou entao ele
        // fez um login. Qdo é feito o login o backend retorna um json que será o nome do usuário, o e-mail e o token.
        case 'USER_FETCHED':
            // É armazenado o usuário no local storage.
            localStorage.setItem(userKey, JSON.stringify(action.payload));
            return { ...state, user: action.payload, validToken: true }
        
        default:
                return state
    }
}