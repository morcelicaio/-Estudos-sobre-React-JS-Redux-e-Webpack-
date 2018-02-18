import React from 'react';

import MenuItem from './menuItem';
import MenuTree from './menuTree';

class Menu extends React.Component{

    render(){
        return(            

            <ul className="sidebar-menu" >
                { /* atributo link está redirecionando para a rota  /  */ }
                <MenuItem link="/" icon="dashboard" nameMenuItem="Dashboard"/>

                { /* O menuTree contém um link q é o raiz e seus childrens q são os subItens, ou seja, MenuItens */ }
                <MenuTree icon="edit" nameMenuTree="Cadastro">
                    { /* atributo link está redirecionando para a rota  /billingCycles  */ }
                    <MenuItem link="billingCycles" icon="usd" nameMenuItem="Ciclos de Pagamentos"/>
                </MenuTree>
            </ul>
        )
    }
}

export default Menu;