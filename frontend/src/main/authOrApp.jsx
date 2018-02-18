// Este componente servirá tanto para encapsular o componente App quanto o componente Auth também.
// E é ele que irá decidir se será exibida a tela de autenticação ( componente Auth ) ou se vai exibir 
// a aplicação em si  ( componente App )  dependendo do estado do token que estiver na aplicação. 

// A tela de login precisará ser exibida quando o token estiver inválido, mas quando o token estiver válido,
// será preciso mostrar a tela atual da aplicação (a tela app).

// Este será o novo componente que será referenciado pelas rotas.  Antes era referenciado o componente App. 

import '../common/template/dependencies'; //recuperando todas as dependências q fazem o template admin-LTE funcionar.
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from './app';
import Auth from '../auth/auth';
import { validateToken } from '../auth/authActions';

class AuthOrApp extends Component {
    
    componentWillMount() {
        // Ao montar o componente, é verificado se existe algum usuário.
        if (this.props.auth.user) {
            //Caso exista o usuário, é verificado se o token desse usuário ( passado por parâmetro ) é válido.
            this.props.validateToken(this.props.auth.user.token);
        }
    }

    render() {
        const { user, validToken } = this.props.auth;

        /*Fazendo a verificação para decidir qual será o componente renderizado na tela.*/
        if (user && validToken) {
            // Se o usuário existir e o token deste usuário for válido, então exibirá o componente App.

            // Uma questão importante é o fato de que é preciso mandar para todas as requisições feitas pelo axios
            // o header authorization e o header authorization é o token recebido pelo backend. 
            axios.defaults.headers.common['authorization'] = user.token
            // Na linha acima é passado o token para o header authorization da requisição. Dessa forma, irá fazer dos
            // cabeçalhos que serão sempre enviados em todas as requisições feitas pelo axios.            
            return <App> { this.props.children } </App>

        }   else if (!user && !validToken) {
                // Se o usuário existir e o token estiver inválido, então exibirá o componente Auth.
                return <Auth />

            }   else {
                    // Se não se encaixar em nenhum desses dois cenários, é porque este método de validateToken
                    // ainda não voltou, ou seja, o usuário existe mas o token está inválido, então é necessário
                    // esperar para exibir ou o componente da aplicação ou o componente de autenticação.
                    return false;
                    // retorna falso p/ ñ renderizar nada pois ainda está esperando a resposta da validação do token.
                }
    }
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp);