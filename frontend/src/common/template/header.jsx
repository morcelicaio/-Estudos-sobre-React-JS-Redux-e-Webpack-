import React from 'react';

import Navbar from './navbar';

class Header extends React.Component{
    
    render(){
        return (
            <header className="main-header" > 
                <a href="/#/" className="logo">

                    { /* Criando os logos na versão mini e na versão normal da tela */ }
                    <span className="logo-mini" > <b>My</b> M </span> 
                    <span className="logo-lg"> <i className="fa fa-money"></i>  <b>My</b> Money   </span>
                </a>

                <nav className="navbar navbar-static-top" >
                    <a href className="sidebar-toggle" data-toggle="offcanvas"></a>
                    <Navbar />
                </nav>

            </header> 
        )
    }

}

export default Header;