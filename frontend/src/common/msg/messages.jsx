// componente que irá trazer as mensagens de erro do sistema que foram configuradas no backend da aplicação.
import React, { Component } from 'react'

import ReduxToastr from 'react-redux-toastr'; //toastr utilizado para exibir as mensagens de erros do sistema.
        //no webpack tem um alias  para a pasta node modules dentro de resolve{ ... ... } .
import 'modules/react-redux-toastr/lib/css/react-redux-toastr.css'; // referência para o css que está lá em node_modules.

class Messages extends Component{    

    render(){                
        return(
           <ReduxToastr 
               timeOut={4000}
               newestOnTop={false}
               preventDuplicates={true}
               position='top-right'
               transitionIn='fadeIn'
               transitionOut='fadeOut'
               progressBar 
            />
        )
    }
};

export default Messages;