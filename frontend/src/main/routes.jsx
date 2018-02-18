import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';

{/* Importando os componentes que entrarão nas rotas. */}
import AuthOrApp from '../main/authOrApp';
import Dashboard from '../dashboard/dashboard';
import BillingCycle from '../billingCycle/billingCycle';

{/* Utilizando a forma de histórico com hashHistory               na linha 17 */}    
{/* Qdp bater na rota / carrega o comp. Dashboard                 na linha 18 */}
{/* Qdp bater em /billingCycles carrega BillCycle                 na linha 19 */}
{/* Caso ñ entrar em nenhuma das rotas acima, redireciona para /  na linha 20 */}
class Routes extends React.Component{
    render(){        
        return(                        
          <Router history={hashHistory}>       
            {/* Quando é chamada uma rota filha dentro de app, o componente filho é chamado como children de App*/}
            {/* O componente que é apontado na rota inicial da aplicação é o componente AuthOrApp que é quem decide  
                se será exibida a tela de login ou a tela inicial da aplicação */}
            <Route path='/' component={ AuthOrApp }> 
                <IndexRoute component={ Dashboard } />
                <Route path='billingCycles' component={ BillingCycle } />
            </Route>
            
            <Redirect from='*' to='/' />             
        </Router>
        )
    }
}
export default Routes;