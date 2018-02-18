const INITIAL_STATE = {summary: {credit: 0, debt: 0}}

// as actionCreators chamam automaticamente o reducer para o estado ser evoluído.
export default function(state = INITIAL_STATE, action){
    
    //switch que irá verificar qual actionCreator foi passada.
    switch(action.type){
        case 'BILLING_SUMMARY_FETCHED':
            return { ...state, summary: action.payload.data }

        // caso a action passada não esteja o próprio state atual é devolvido como valor default
        default:
            return state
    }
}

