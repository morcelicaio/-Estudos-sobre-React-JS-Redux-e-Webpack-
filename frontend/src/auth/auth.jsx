// Componente que representa a tela tanto de login quanto a de cadastrar-se
import './auth.css';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';

import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'
import Messages from '../common/msg/messages'
import InputAuth from '../common/form/inputAuth'

import { login, signup } from './authActions';   //importando alguns actioCreators.

class Auth extends Component {
    constructor(props) {
        super(props)

        // o atributo loginMode do estado está servindo para verificar se a tela está como login, ou
        // se irá usar a tela de cadastrar-se
        this.state = { loginMode: true }
    }

    // método que muda o estado da tela. se estiver na de login muda para a de cadastrar-se e vice-versa.
    changeMode() {
        this.setState({ loginMode: !this.state.loginMode });
    }

    // recebe o objeto vindo do formulário como parâmetro e dependendo do estado da tela, ele chama ou o
    // actionCreator login ou o actionCreator signup no caso de cadastrar o novo usuário.
    onSubmit(formValues) {
        const { login, signup } = this.props;

        this.state.loginMode ? login(formValues) : signup(formValues);
    }

    render() {
        const { loginMode } = this.state;
        const { handleSubmit } = this.props;

        return (
            <div className="login-box">
                <div className="login-logo"><b> My</b> Money</div>
                <div className="login-box-body">
                    <p className="login-box-msg">Bem vindo!</p>

                    {/*A partir do momento em que o reduxForm faz parte da aplicação, ele fornece para as props do
                      componente um método chamado handleSubmit que serve para manipular o submit do formulário. */}
                    <form onSubmit={ handleSubmit(formValues => this.onSubmit(formValues)) }>
                        <Field component={ InputAuth } type="input" name="name"
                            placeholderAuth="Nome" icon='user' hide={ loginMode } 
                        />

                        <Field component={ InputAuth } type="email" name="email"
                            placeholderAuth="E-mail" icon='envelope' 
                        />

                        <Field component={ InputAuth } type="password" name="password"
                            placeholderAuth="Senha" icon='lock' 
                        />

                        <Field component={ InputAuth } type="password" name="confirm_password"
                            placeholderAuth="Confirmar Senha" icon='lock' hide={ loginMode } 
                        />

                        <Row>
                            <Grid cols="4">
                                <button type="submit"
                                    className="btn btn-primary btn-block btn-flat">
                                    { loginMode ? 'Entrar' : 'Registrar' }
                                </button>
                            </Grid>
                        </Row>

                    </form>

                    <br />

                    <a onClick={() => this.changeMode()}>
                        { loginMode ? 'Novo usuário? Registrar aqui!' :
                            'Já é cadastrado? Entrar aqui!' }
                    </a>
                </div>

                {/*Esse é o componente para exibir as mensagens vindas do backEnd*/}
                <Messages />
            </div>
        )
    }
}

Auth = reduxForm({ form: 'authForm' })(Auth);
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch );

export default connect(null, mapDispatchToProps)(Auth);
