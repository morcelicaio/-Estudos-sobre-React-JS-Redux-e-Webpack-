import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getList, showUpdateForm, showDeleteForm } from './billingCycleActions';

class BillingCycleList extends Component{

    // chamando o getList que vai no backend e altera o estado carregando os billingCycles no estado.
    componentWillMount(){
        this.props.getList();        
    }    

    renderRows(){
                            // se não vier um resultado válido em list, é atribuido um array vazio para a const
        const billingCycles = this.props.list || [];    // atribuindo os billingCycles carregados para uma const.

        // mapeando e percorrendo a lista de billingCycles. 
        return billingCycles.map( bc =>{
            return(
                <tr key={ bc._id } >
                    <td> { bc.name } </td>    
                    <td> { bc.month } </td>
                    <td> { bc.year } </td>
                    <td> {/* aqui pode-se criar um componente para o botao também para fazer o reuso */}
                        {/*no clique do botao ele pega o objeto bc da linha e envia para a tela de alterar. */}
                        <button className='btn btn-warning' onClick={ () =>{ this.props.showUpdateForm(bc) } } > 
                            <i className='fa fa-pencil'></i> 
                        </button>
                        <button className='btn btn-danger' onClick={ () =>{ this.props.showDeleteForm(bc) } } > 
                            <i className='fa fa-trash-o' ></i> 
                        </button>  
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div>
                <table className="table" >
                    <thead>
                        <tr>                            
                            <th>Nome: </th>
                            <th>Mês:  </th>
                            <th>Ano:  </th>
                            {/* recebendo a classe css que vem lá do arquivo custom.css  dentro da pasta template */}
                            <th className='table-actions' >Ações: </th> 
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>                
            </div>
        )
        
    }
}

const mapStateToProps = state =>({ list: state.billingCycle.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdateForm, showDeleteForm }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList);
