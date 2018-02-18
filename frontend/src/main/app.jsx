import React from 'react';

import Header from '../common/template/header';
import Sidebar from '../common/template/sidebar';
import Footer from '../common/template/footer';
import Messages from '../common/msg/messages';  

class App extends React.Component{
    render(){
        return(
                // utilizando as classes do template admin-LTE
                <div className="wrapper"> 
                <Header />

                { /* Dentro do Sidebar está o menu com seus menuItens e a menuTree */ }
                <Sidebar />

                <div className="content-wrapper" >
                    { this.props.children }
                </div>
                <Footer />       
                <Messages />
            </div>
        )
    }
}
    
export default App;