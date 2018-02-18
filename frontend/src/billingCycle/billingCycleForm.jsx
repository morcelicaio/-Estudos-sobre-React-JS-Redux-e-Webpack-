import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// importando a funcao que dispara as ações que irão inicializar a tela de bc's após alguma ação de CRUD.
import { initBillingCycleScreen } from './billingCycleActions'; 

// importando a funcao reduxForm que é semelhante à função connect do 'react-redux'. Essa funcao reduxForm faz a  
// conexão do formulário com o redux.
// Já a tag Field, é usada para controlar os campos do formulário.
import { reduxForm, Field, formValueSelector } from 'redux-form';
// o método formValueSelector é responsável por pegar um valor que está dentro do estado do formulário (redux-form)

import LabelAndInput from '../common/form/labelAndInput'; 
import ItemList from './itemList';
import Summary from './summary';

class BillingCicleForm extends Component{

    calculateSummary(){
        /* billingCycleCredits que vem das props é um array de objetos contendo todos os creditos desse billingCycle.
           cada objeto do array contém dois atributos. - credits: [{ name: 'salario1' value: 2000 }];
           billingCycleDebts é a mesma coisa.   */
        const credits = this.props.billingCycleCredits;
        const debts = this.props.billingCycleDebts;

        /* usando o o metodo reduce para recuperar a soma total de todos os creditos contidos nesse aray de objetos.
           o metodo reduce recebe 2 parâmetros.  Um callback onde o 1° parâmetro é o contador(o somatório) e o 
           2° parâmetro é cada item da lista que está sendo percorrida. E o 2° parâmetro do reduce é o valor
           que o somatório do callback irá se inicar. Nesse caso o valor 0.  */
        const creditsValue = credits.reduce( (sum, credit) => {            
            // Quando for criar um novo billingCycle, então a lista de credits e debts será vazia,
            // então aqui quando o valor de credit/debt.value for null ou undefined, será atribuido 0.
            return sum + +credit.value || 0 ; 
            /* O simbolo + antes de credit.value é para converter o tipo do dado para number, dessa forma
               evitando que seja exibido um NaN. */
        }, 0);

        const debtsValue = debts.reduce( (sum, debt) =>{
            return sum + +debt.value || 0;
            /* O simbolo + antes de debt.value é para converter o tipo do dado para number, dessa forma
               evitando que seja exibido um NaN. */

        }, 0);
        
        // a funcao calculateSummary retorna um objeto contendo a soma dos créditos e a soma dos débitos. 
        return {
            sumOfCredits: creditsValue, 
            sumOfDebts: debtsValue
        }
    }

    render(){                
        // A partir do momento em que o reduxForm faz parte da sua aplicação, ele fornece para as props do componente
        // um método chamado handleSubmit que serve para manipular o submit do formulário.
        const { handleSubmit, billingCycleCredits, billingCycleDebts } = this.props            

        // recebendo a soma total dos créditos e débitos. Cada atributo possui apenas um valor e não um array. 
        const { sumOfCredits, sumOfDebts } = this.calculateSummary();

        return(
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    {/* Na tag field, é possível escolher qual será o tipo de componente que será usado  
                        no atributo 'component'.  Nesse caso estamos dizendo que será um input. 
                        É possível também criar um componente próprio e passar para o atributo component.*/}
                    {/*<Field name='name' component='input' >        Componente padrão do redux-form     */}
                    <Field name='name' component={ LabelAndInput } readOnly={ this.props.readOnly }
                        cols='12 4' label='Nome' placeholder='Informe o nome' 
                    />
                    <Field name='month' component={ LabelAndInput } readOnly={ this.props.readOnly }
                        cols='12 4' label='Mês' placeholder='Informe o mês' type='number'
                    />
                    <Field name='year' component={ LabelAndInput } readOnly={ this.props.readOnly } 
                        cols='12 4' label='Ano' placeholder='Informe o ano' type='number'
                    />
                    {/* o atributo name da Tag Field, será o nome do atributo no objeto que o form retorna. */}
                    
                    <Summary credit={ sumOfCredits } debt={ sumOfDebts } />

                    {/* no atributo field do ItemList, é passado qual tipo de lista do redux-form será passada,
                        se é credits ou debts.  Em list é passado a lista ou de credits ou de debts */}
                    <ItemList cols='12 6' 
                        list={ billingCycleCredits } field='credits'
                        legendFieldset='Créditos' readOnly={ this.props.readOnly }
                    />
                    <ItemList cols='12 6' 
                        list={ billingCycleDebts } field='debts' legendFieldset='Débitos'
                        showFieldStatus={ true } readOnly={ this.props.readOnly }
                    /> 
                    
                </div>
                <div className='box-footer'>
                    { /*Aqui não tem o onClick pois o botao tipo submit usa a action handleSubmit que vem do pai.*/ }
                    <button type='submit' className={ `btn btn-${ this.props.submitClassButton }` }> 
                        { this.props.submitLabelButton } 
                    </button>

                    <button type='button' 
                            className={`btn btn-${ this.props.cancelClassButton }` } 
                            onClick={ this.props.initBillingCycleScreen  } 
                    > 
                        { this.props.cancelLabelButton }
                    </button>
                </div>
            </form>
        );
    }
}

// Dando um nome para o id desse formulário. Será 'billingCycleForm' o id.
// E passando a flag  destroyOnUnmount recebendo false para que o formulário não perca seus dados quando ele
// for destruído pois na tela da lista de billingCycles no clique do botão de alterar o bc, os dados do bc
// na tela da lista de bc's serão passados para o form da tela de alterar bc.
// E também essa estratégia ajudará na hora de trabalhar com formulários dinâmicos.
BillingCicleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCicleForm);
// na linha acima também é usado o padrao de projeto decorator para decorar o BillingCycleForm com o reduxForm.

// o método formValueSelector recebe como parâmetro o id do formulário e retorna uma função que irá permitir 
// recuperar atributos do estado desse formulário.
const selector = formValueSelector('billingCycleForm');

// criando as propriedades billingCycleCredits/Debts para o componente utilizando o mapStateToProps.
// O metodo selector passa o estado do form como 1° parâmetro e como 2° parâmetro passa o nome
// do atributo que será recuperado do form (usando o estado do redux-form)   
const mapStateToProps = state => ( {
                                      billingCycleCredits: selector(state, 'credits'), 
                                      billingCycleDebts: selector(state, 'debts') 
                                    }
                                 )

const mapDispatchToProps = dispatch => bindActionCreators({ initBillingCycleScreen }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingCicleForm);
