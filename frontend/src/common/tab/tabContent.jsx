import React, { Component } from 'react';

import If from '../operator/if';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { meuMetodo } from '../tab/tabActions';

class TabContent extends Component{
    render(){
        const tab = this.props.id; //recupera o nome desta aba. Por exemplo 'tabList'. 

        // verificando se a aba que abre o conteúdo desse componente está selecionada.
        const selected = this.props.tab.selected === tab

        // Expressão que irá definir se o componente irá estar visível na tela ou não.
        // Essa expressão recupera o valor do atributo tab que está dentro do objeto visible que está sendo retornado
        const visible = this.props.tab.visible[tab];

        return(

            <If test={ visible } >
                {/*Se a aba estiver selecionada, insere a classe css q mostra na tela essa div e o children da div */}
                <div id={ tab } className={`tab-pane ${ selected ? 'active' : '' } `} > 
                    { this.props.children } 
                </div>
            </If>
            
        );
    }
} 

const mapStateToProps = state => ({ tab: state.tab })
const mapDispatchToProps = dispatch => bindActionCreators({meuMetodo}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TabContent);