// componente de função que será usado para fazer validações na aplicação
// sem precisar ficar misturando código javascript com os componentes reacts nos arquivos. 

import React from 'react';

export default props =>{
    // se a validação feita for verdadeira irá retornar todos os componentes filhos da tag If
    if(props.test){
        return props.children
    }   else{
            return false
        }
}