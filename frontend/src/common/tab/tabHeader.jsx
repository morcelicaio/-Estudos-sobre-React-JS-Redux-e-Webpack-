import React, { Component } from 'react';

import If from '../operator/if';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectTab } from './tabActions';

class TabHeader extends Component{
    render(){
        const tab = this.props.target; //recupera o nome desta aba. Por exemplo 'tabList'. 

        // recebe um valor booleano verificando se essa aba é a aba selecionada no clique.
        const tabSelected = this.props.tab.selected === tab 

        // Expressão que irá definir se o componente irá estar visível na tela ou não.
        // Essa expressão recupera o valor do atributo tab que está dentro do objeto visible que está sendo retornado
        const visible = this.props.tab.visible[tab];            

        return(
            /* visible contém true ou false.  Se true, retorno os children de If */
            <If test={ visible } >
                              {/*se for a aba selecionada insere um css para marcar a aba*/}
                <li className={ tabSelected ? 'active' : '' } > 
                    <a href="javascript:;" 
                    data-toggle='tab' 
                    data-target={ tab }  
                    onClick={ () => this.props.selectTab(tab) }
                    >
                        <i className={ `fa fa-${ this.props.icon }` }></i> { this.props.label }  
                    </a> 
                </li>
            </If>
            
        );
    }
}

const mapStateToProps = state =>( { tab: state.tab } )
const mapDispatchToProps = dispatch => bindActionCreators({ selectTab }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabHeader) ;