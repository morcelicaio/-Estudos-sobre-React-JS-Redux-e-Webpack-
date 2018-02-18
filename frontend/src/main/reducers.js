import { combineReducers } from 'redux';

//é o cara que controla o estado do formulário a partir do estado centralizado que o redux cria na aplicação.
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr'; //evolui o estado das mensagens da aplicação.

import DashboardReducer from '../dashboard/dashboardReducer';          // Responsável p evoluir o estado de dashboard.
import TabReducer from '../common/tab/tabReducer';                     // Responsável por evoluir o estado de tab.
import BillingCycleReducer from '../billingCycle/billingCycleReducer'; // Evolui o estado de tab billingCycle.
import AuthReducer from '../auth/authReducer';                        // Evolui o estado de auth.

// utilizando o metodo combineReducers para devolver um objeto com todos os reducers da aplicação.
const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer,
    billingCycle: BillingCycleReducer,
    form: formReducer,
    toastr: toastrReducer,
    auth: AuthReducer

    // Cada formulário da aplicação conectado ao redux-form terá um id único. E dentro desse atributo 'form', 
    // será criado um objeto para cada formulário baseado em seu id e dentro de cada objeto desse form 
    // irão ter todos os dados relativos a cada formulário que foi criado.
})

export default rootReducer;