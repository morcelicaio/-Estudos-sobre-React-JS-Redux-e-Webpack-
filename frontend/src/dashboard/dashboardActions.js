// Arquivo contendo as actionCreators de dashboard.
import axios from 'axios';  // importando o cliente http para realizar as requisições.
const BASE_URL = 'http://localhost:3004/api';  // url configurada para realizar as requisições.

// exportando a actionCreator getSummary
export function getSummary(){
    // recuperando a requisição GET assíncrona feita pelo axios. Como é uma requisição assíncrona ela é uma promise.
    const request = axios.get(`${ BASE_URL }/billingCycles/summary`);

    //a actionCreator retorna um objeto que será uma ação.
    return{
        // atributo type obrigatório para o reducer reconhecer qual foi a chamada retornada.
        type: 'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}