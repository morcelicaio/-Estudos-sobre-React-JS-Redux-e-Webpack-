import React from 'react';

import MenuItem from './menuItem';

class MenuTree extends React.Component{
    render(){
        return(
            <li className="treeview">
                { /*Este link é o item do pé da árvore  irá ter um ícone do lado esquerdo e um do lado direito.*/ }
                <a href>                     
                    <i className={ `fa fa-${ this.props.icon }` } > </i> <span>{ this.props.nameMenuTree }</span>
                    <i className="fa fa-angle-left pull-right" > </i>
                </a>

                <ul className="treeview-menu" >
                    {/*Aqui serão os filhos do item principal da árvore. Provavelmente serão os componentes menuItens*/ }
                    { this.props.children }  
                </ul>

            </li>
        )
    }
}

export default MenuTree;