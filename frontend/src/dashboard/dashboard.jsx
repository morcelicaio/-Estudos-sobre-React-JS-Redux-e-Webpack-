import React from 'react';
import { connect } from 'react-redux'; // import usado para conectar o redux com o react 

import { bindActionCreators } from 'redux'; // import usado para linkar os actionCreators na classe react.
import { getSummary } from './dashboardActions'; // importando o actionCreator getSummary.

import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import ValueBox from '../common/widget/valueBox';
import Row from '../common/layout/row';
import Grid from '../common/layout/grid';

class Dashboard extends React.Component{

    //alterando o estado antes de renderizar o componente.
    componentWillMount() {
        this.props.getSummary();
    }

    render(){       
        const { credit, debt } = this.props.summary;
        
        return(
            <div>
                <ContentHeader title='Dashboard' subTitle='Versão 1.0' />
                <Content>
                    <Row>
                        <Grid cols="12 12 12 4" >
                            <ValueBox color="green" value={`R$ ${ credit }` } text="Total de Créditos" icon="bank"/>
                        </Grid>
                        <Grid cols="12 12 12 4" >
                            <ValueBox color="red" value={`R$ ${ debt }` } text="Total de Débitos" icon="credit-card"/>
                        </Grid>
                        <Grid cols="12 12 12 4">
                            <ValueBox color="blue" value={`R$ ${ credit - debt }` } text="Saldo" icon="money" />
                        </Grid>   
                    </Row> 
                   
                </Content>
            </div>            
        )
    }
}

// Mapeando o estado do redux para que esta classe consiga ter as props a disposição para serem usadas.
// Criando a prop 'summary' para essa classe. Essa prop recebe o que vem lá do reducer no atributo 'dashboard'. 
const mapStateToProps = state =>({summary: state.dashboard.summary })

// Mapeando e permitindo a classe a utilizar o actionCreator getSummary criado em dashboardActions.js. 
const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch)

// Realizando a conexão do mapeamento criado entre o redux e a classe react.
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)