// Componente que será usado nos formulários onde se tem o atributo 'component'
// Este componente está sendo utilizado pois está sendo usado o css padrão do template adminLTE (bootstrap).
// Então servirá para estilizar o formulário.
import React, { Component } from 'react';

import Grid from '../layout/grid';  

class LabelAndInput extends Component{
    render(){
        return(
            <Grid cols={ this.props.cols } >
                <div className='form-group'>
                    <label htmlFor={ this.props.name } > { this.props.label } </label>
                    
                    { /*Quando o componente Field do redux-form for renderizar o componente para dentro do componente
                        que será criado ( no caso esse LabelAndInput ) ele irá passar dentro de props uma propriedade 
                        input. E essa propriedade input que será passada p esse componente possui várias propriedades
                        que serão usados pelo redux-form e que são passadas pelo redux-form p serem passadas para esse 
                        componente que está sendo criado */ }
                    
                    { /*Dando um spread dentro do input dessa classe para que todas as propriedades desse spread input
                        que vem do componente Field do redux-form sejam pasadas para o input desta classe */ }
                    <input { ...this.props.input } 
                           className='form-control' 
                           placeholder={ this.props.placeholder }
                           readOnly={ this.props.readOnly } 
                           type={ this.props.type }
                    />
                </div>
            </Grid>
        );
    }
}

export default LabelAndInput;