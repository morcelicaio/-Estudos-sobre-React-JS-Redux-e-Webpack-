import React, { Component } from 'react'

import Grid from '../common/layout/grid'; 
import Row from '../common/layout/row';
import ValueBox from '../common/widget/valueBox';

class Summary extends Component{
    render(){
        // recupera os valores passados pelo billingCycleForm
        const { credit, debt } = this.props;

        return(
            <Grid cols='12'> 
                <fieldSet>
                    <legend> Resumo </legend>
                    <Row> 
                        <ValueBox cols='12 4' color='green' value={ `R$ ${ credit }` } text='Créditos' icon='bank' />                                
                        <ValueBox cols='12 4' color='red' value={ `R$ ${ debt }` } text='Débitos' icon='creditCard' />                                
                        <ValueBox cols='12 4' color='blue' value={ `R$ ${ (credit-debt) }` } text='Saldo' icon='money' />
                    </Row>
                </fieldSet>
            </Grid>
        );
    }
}

export default Summary;