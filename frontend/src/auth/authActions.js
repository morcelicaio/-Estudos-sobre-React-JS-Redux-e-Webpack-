import { toastr } from 'react-redux-toastr'; // importando o toastr para exibir as mensagens.
import axios from 'axios';
import constants from '../constants';       // importando as urls API_URL e OAPI_URL

// Esta função é usada no componente onde está o formulário de login/cadastrar-se
// e recebe como parâmetros o objeto com os valores do formulário e a url. 
export function login(formValues){
    return submit(formValues, `${ constants.OAPI_URL }/login`);
}

// Esta função é usada no componente onde está o formulário de login/cadastrar-se
// e recebe como parâmetros o objeto com os valores do formulário e a url. 
export function signup(formValues){
    return submit(formValues, `${ constants.OAPI_URL }/signup`);
}

// O método não está sendo exportado pois ela não será usada em outros módulos.
// O método usado para submeter o formulário.  ( pode ser ou o formulário de login, ou o formulário de cadastro )
// recebe como parâmetros o objeto com os valores do formulário e a url.
function submit(formValues, url) {
    console.log(formValues);
    return dispatch => {
        // se ocorrer tudo certo no post ele irá retornar na resposta o obj do usuário que realizou a ação.
        axios.post(url, formValues).then(resp => {
                dispatch([
                    { type: 'USER_FETCHED', payload: resp.data }
                ])
        })
        .catch(e => {
            e.response.data.errors.forEach(error => toastr.error('Erro', error))
        })
    }
}

export function logout(){
    // quando é feito o logout, é chamada a action de token validado e é passado o payload como falso, pois na action
    // ele verifica o conteúdo do payload e caso for falso é removido o usuário que está no local storage.
    return { type: 'TOKEN_VALIDATED', payload: false }
}

// função que será usada para verificar se o token é válido ou não.
export function validateToken(token){
    return dispatch =>{
        // verifica se o token existe
        if(token){
            // se ocorrer tudo bem chama a action TOKEN_VALIDATED e retorna no payload o atributo valid
            // do objeto usuário que o backend retorna quando faz o post 
            axios.post(`${ constants.OAPI_URL }/validateToken`, { token }).then( resp => {
                dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid });
            }).catch( e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }) );
        }   else{
                dispatch({ type: 'TOKEN_VALIDATED', payload: false })
            }
    }
}