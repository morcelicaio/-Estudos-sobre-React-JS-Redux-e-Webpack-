import React from 'react';

class ContentHeader extends React.Component{
    render(){
        return(
            <section className="content-header" >  
                <h1> { this.props.title } <small> { this.props.subTitle } </small>  </h1>
            </section> 
        )
    }
}

export default ContentHeader;