    // Arquivo contendo as actionCreators de billingCycle.
import axios from 'axios';  // importando o cliente http para realizar as requisições.
import { toastr } from 'react-redux-toastr';
    
    // Importando um actionCreator do redux-form que serve para inicializar o form a partir de um objeto de dados
    // recebido pelo parâmetro da função initialize.
import { initialize, formValues } from 'redux-form'; 

    // importando as actions que definem quais abas serão mostradas na tela e qual será a aba selecionada por padrão.
import { showTabs, selectTab } from '../common/tab/tabActions';

const BASE_URL = 'http://localhost:3004/api';  // url configurada para realizar as requisições.
const INITIAL_VALUES_FORM = { credits: [ {} ], debts: [ {} ]  };  //recebe um array de credits e debts vazio 
//const que recebe os objetos vazios e será usada para inicializar o form com os dados.

// exportando a actionCreator getList
export function getList(){
    // recuperando a requisição GET assíncrona feita pelo axios. Como é uma requisição assíncrona ela é uma promise.
    const request = axios.get(`${ BASE_URL }/billingCycles`);

    //a actionCreator retorna um objeto que será uma ação.
    return{
        // atributo type obrigatório para o reducer reconhecer qual foi a chamada retornada.
        type: 'BILLING_CYCLE_FETCHED',
        payload: request
    }
}

export function createBillingCycle(formValues){    
    // é retornada a chamada da função onSubmitBillingCycleForm que recebe como parâmetros 1° o objeto contendo
    // os dados do formulário e depois o nome da ação que será realizada pelo axios.
    return onSubmitBillingCycleForm(formValues, 'post');
}

//recebe o objeto que engloba os campos do formulário. inputs etc..
export function updateBillingCycle(formValues){
    // é retornada a chamada da função onSubmitBillingCycleForm que recebe como parâmetros 1° o objeto contendo
    // os dados do formulário e depois o nome da ação que será realizada pelo axios.
    return onSubmitBillingCycleForm(formValues, 'put');
}
    // faz a mesma coisa do update porém realiza o delete.
export function deleteBillingCycle(formValues){
    return onSubmitBillingCycleForm(formValues, 'delete');
}

// Esta função é a que fica responsável pelas ações do formulário (create/update/delete). Ela recebe como
// 1° parâmetro o objeto contendo os dados do formulário e como 2° parâmetro o verbo http da ação (post/put/delete). 
function onSubmitBillingCycleForm(formValues, method){       
    // ao invés de retornar uma action, será retornada uma função que será chamada pelo middleware thunk.
    // essa função recebe o 'dispatch' como parâmetro e retornando essa função o próprio middleware terá
    // o controle para usar o dispatch e disparar a action que quiser.
    return dispatch => {
        // se for 1 ação de update ou delete, o obj já possui um id q o mongoDB atribuiu a ele no momento do cadastro.
        const id = formValues._id || '';    // se o obj nao tiver o campo _id  então é atribuido nulo para a const.
        
        // Na requisição do axios, irá executar a ação do verbo http e passa o obj que o formulário envia para a api.
        // é possível chamar uma funcao passando uma notação parecida com um array.
        // nesse caso ele chama o metodo de qual verbo http foi passado. ex:(axios.post() /axios.update() etc..)
        // E caso não exista um id, ele fará um post normal. Não irá atrapalhar a url pois o id será igual a vazio.
        axios[method](`${ BASE_URL }/billingCycles/${ id }`, formValues).then( response =>{
            toastr.success('Sucesso', 'Operação realizada com sucesso');

             // O dispatch chama o actionCreator initBillingCycleScreen que usa o middleware redux-multi
            // que permite a disparada de vários actionCreators em sequência.
            dispatch(initBillingCycleScreen());
        }).catch( error => {
            // no backend existe um atributo chamado errors e ele retorna a lista de errors nesse momento. 
            const erros =  error.response.data.errors;

            erros.forEach( erro =>{
                toastr.error('Erro', erro)
            });
        });
    }
}

export function showUpdateForm(billingCycle){    
    // Novamente disparando mais de um actionCreator em seguida usado o middleware redux-multi.
    // Ao cliclar no botão de atualizar, 1° ele motra a aba alterar, depois deixa essa aba selecionada e depois
    // chama o actionCreator initialize que é do redux-form que passa o objeto billingCycle da linha clicada para
    // ser carregado no formulário de alteração.
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)        
    ]
    // o actionCreator initialize recebe como 1° parâmetro o id do formulário que irá ser inicializado.
    // E como 2° parâmetro recebe o objeto que contém os dados que serão colocados nos campos do formulário.
}
    //faz a mesma função que o update porém ele irá mostrar um form com os valores readOnly={ true }
export function showDeleteForm(billingCycle){
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ];
}

// actionCreator usado após ser feita alguma ação no formulário. Por ex: cadastrar/alterar ou deletar.
export function initBillingCycleScreen(){
    // Disparando mais de um actionCreator em seguida pois o middleware redux-multi permite ser disparado um array
    // com várias actionCreators. Cada item do actionCreator do array é disparado em sequência.
    return[
        //Mostrará tabList e tabCreate, selecionará tabList, depois criará a lista de bc's e inicilizará o form vazio.
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES_FORM)
    ];
}