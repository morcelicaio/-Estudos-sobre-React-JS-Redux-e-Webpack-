//criando o componente que imita o grid do bootstrap pois o template admin-LTE utiliza o bootstrap
import React, { Component } from 'react'

class Grid extends Component{

    toCssClasses(tamanhoColunas){       
         /* verifica se foi informado as colunas do grid. Caso sim, ele separa a string a partir de cada espaço.
           e devolve um array. Por exemplo passou 4 8 12 no parâmetro.  Irá devolver um array [4, 8, 12].  */
        const cols = tamanhoColunas ? tamanhoColunas.split(' ') : [];

        let classes = '';
        if(cols[0]) classes += `col-xs-${ cols[0] }`;
        if(cols[1]) classes += ` col-sm-${ cols[1] }`;
        if(cols[2]) classes += ` col-md-${ cols[2] }`;
        if(cols[3]) classes += ` col-lg-${ cols[3] }`;

        return classes;
    };

    render(){
        
        const tamanhoColunas = this.toCssClasses(this.props.cols || '12');

        return(
            <div className={ tamanhoColunas } > 
                { this.props.children }
            </div>
        )
    }
};

export default Grid;