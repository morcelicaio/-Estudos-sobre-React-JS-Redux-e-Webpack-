import React from 'react';

{ /* Dentro da tag content será exibido todo o conteúdo de cada tela. Serão os childrens */}

class Content extends React.Component{
    render(){
        return(
            <section className="content" >
                { this.props.children }
            </section>
        )
    }
}

export default Content;