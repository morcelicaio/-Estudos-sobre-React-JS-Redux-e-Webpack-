// componente especial para ser usado no formulário de login/cadastra-se
import React, { Component } from 'react';
import If from '../operator/if';

class InputAuth extends Component{
    render(){
        return(
            // irá verificar se o input estára escondido na tela ou não 
            <If test={ !this.props.hide }>
                <div className='form-group has-feedback'>
                    <input { ...this.props.input } className='form-control' placeholder={ this.props.placeholderAuth }
                           readOnly={ this.props.readOnly } type={ this.props.type }
                    />

                    <span className={`glyphicon glyphicon-${ this.props.icon } form-control-feedback `} ></span>
                </div>
            </If>
        )
    }
}

export default InputAuth;