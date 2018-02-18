import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import Tabs from '../common/tab/tabs';
import TabsHeader from '../common/tab/tabsHeader';
import TabsContent from '../common/tab/tabsContent';
import TabHeader from '../common/tab/tabHeader';
import TabContent from '../common/tab/tabContent';

import BillingCycleList from './billingCycleList';
import BillingCycleForm from './billingCycleForm';

import { selectTab, showTabs } from '../common/tab/tabActions'; // recuperando os actionCreators.
import { initBillingCycleScreen, 
         createBillingCycle, updateBillingCycle, deleteBillingCycle } from './billingCycleActions'; 
class BillingCycle extends React.Component{

    //Depois de ter usado o bindActionCreators e ligado o actionCreator 'initBillingCycleScreen' às props dessa classe,
    // é chamado o initBillingCycleScreen é chamado e dentro é dada as opções para ver quais abas serão mostradas, 
    // qual aba será a selecionada por padrão e os dados que serão inicializados no formulário
    componentWillMount(){
        this.props.initBillingCycleScreen();
    }

    render(){
        return(
            <div>
                <ContentHeader title="Ciclo de Pagamento" subTitle="Cadastro" />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            <TabHeader label='Incluir' icon='plus' target='tabCreate' />
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id="tabList"> 
                                <BillingCycleList /> 
                            </TabContent>
                            <TabContent id="tabCreate"> 
                                <BillingCycleForm onSubmit={ this.props.createBillingCycle } 
                                                  submitClassButton='primary' cancelClassButton='danger'
                                                  submitLabelButton='Cadastrar' cancelLabelButton='Cancelar'
                                /> 
                            </TabContent>
                            <TabContent id="tabUpdate"> 
                                <BillingCycleForm  onSubmit={ this.props.updateBillingCycle } 
                                                   submitClassButton='primary' cancelClassButton='danger'
                                                   submitLabelButton='Alterar' cancelLabelButton='Cancelar'
                                />
                            </TabContent>
                            <TabContent id="tabDelete">  
                                {/* Passando a propriedade readOnly pois esse form terá os campos somente leitura. */}
                                <BillingCycleForm onSubmit={ this.props.deleteBillingCycle } readOnly={ true } 
                                                  submitClassButton='danger' cancelClassButton='white'
                                                  submitLabelButton='Remover' cancelLabelButton='Cancelar'
                                />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>                              
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ 
                                            initBillingCycleScreen,
                                            createBillingCycle, 
                                            updateBillingCycle, 
                                            deleteBillingCycle }, dispatch 
                                       );

export default connect(null, mapDispatchToProps)(BillingCycle);