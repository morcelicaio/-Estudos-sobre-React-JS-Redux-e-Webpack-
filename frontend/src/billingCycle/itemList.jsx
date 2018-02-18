import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// o método arrayInsert  recebe como parâmetros 1°o nome do form, 2° parâmetro o field que será inserido no form,
// (lembrando que credits é um array que está sendo controlado pelo redux-form) 
// como 3° parâmetro o índice onde ele irá inserir o elemento e como 4° pode ser passado qualquer valor. Nesse caso
// será passado o objeto que será incluído no form.
import { Field, arrayInsert, arrayRemove } from 'redux-form';
// O método arrayRemove remove um item do array do redux-form. Ele recebe como parâmetros 1°o nome do form, 
// 2° parâmetro o field q será excluído no form e como 3° parâmetro o índice onde ele irá remover o elemento do array.

import Grid from '../common/layout/grid';
import Input from '../common/form/input';
import If from '../common/operator/if';

class ItemList extends Component{

    addItem(index, item = {} ){  // Se ñ for passado o item na chamada do método, é passado um objeto vazio p 'item'
        const field = this.props.field;  // recebe qual o tipo de field que foi passado.  Se foi credits ou debts.        

        // no caso do form deletar os campos serão readOnly, então não será permitido adicionar outros itens.
        if(!this.props.readOnly ){ // se nao for readOnly entra no if.                        
            //Passando o id do form, o nome do campo que será inserido ( credits do estado do redux-form ), o índice
            // e o valor que será inserido nesse array.
            this.props.arrayInsert('billingCycleForm', field , index, item);
        } 
    }

    removeItem(index){
        const field = this.props.field;  // recebe qual o tipo de field que foi passado.  Se foi credits ou debts.

        // no caso do form alterar, os campos não serão readOnly, então será permitido remover qualquer item.
        // também verifica se existe algum item para poder ser removido na lista.
        if(!this.props.readOnly && this.props.list.length > 1 ){
            //Passando o id do form, o nome do campo que será excluído ( credits ou debts do estado do redux-form ), 
            // e o índice que será excluído da lista do redux-form.                     
            this.props.arrayRemove('billingCycleForm', field, index);
        }
    }

    renderRows(){  
        const field = this.props.field;  // recebe qual o tipo de field que foi passado.  Se foi credits ou debts. 

        //billingCycleItems está recebendo o array dos items (credits ou debts) q foram recuperados do estado do form.
        const billingCycleItems = this.props.list || [];              

        return billingCycleItems.map( (item, index) => (
            <tr key={ index } >     
                
                <td> 
                    {/*No atributo name precisa ser passado o mesmo nome q está no atributo do estado do redux-form*/}
                    <Field name={ `${ field }[${ index }].name` } component={ Input }
                        placeholder='Informe o nome' readOnly={ this.props.readOnly }
                    /> 
                </td>

                <td> 
                    <Field name={ `${ field }[${ index }].value` } component={ Input }
                        placeholder='Informe o valor' readOnly={ this.props.readOnly } type={ this.props.type }
                    />  
                </td>
                
                <If test={ this.props.showFieldStatus }>
                    <td> 
                        <Field name={ `${ field }[${ index }].status` } component={ Input }
                            placeholder='Informe o status' readOnly={ this.props.readOnly }  
                        />    
                    </td>                      
                </If>                         

                <td className='table-actions' >
                    <button type='button' className='btn btn-success' onClick={ () => this.addItem(index + 1) }  > 
                        <i className='fa fa-plus'></i>
                    </button>

                    {/* Esse botão irá clonar o elemento clicado. ele passa o item que foi clicado por parâmetro.*/}
                    <button type='button' className='btn btn-warning' onClick={ ()  => this.addItem(index, item)} > 
                        <i className='fa fa-clone'></i>
                    </button>

                    {/* Esse botão irá remover o elemento clicado. */}
                    <button type='button' className='btn btn-danger' onClick={ () => this.removeItem(index) } >
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ));        
    }

    render(){        
        return(
            <Grid cols={ this.props.cols }>
                <fieldset>
                    <legend> { this.props.legendFieldset } </legend>   

                    <table className='table'>
                        <thead> 
                            <tr>
                                <th> Nome </th>
                                <th> Valor </th>
                                <If test={ this.props.showFieldStatus } > 
                                    <th>Status</th>
                                </If>
                                <th> Ações </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            { this.renderRows() }                            
                        </tbody>                                
                    </table>

                </fieldset>                
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch);

export default connect(null, mapDispatchToProps)(ItemList);