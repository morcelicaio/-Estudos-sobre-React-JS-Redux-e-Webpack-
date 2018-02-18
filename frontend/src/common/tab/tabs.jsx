import React, { Component } from 'react';

class Tabs extends Component{
    render(){
        return(
            <div className='nav-tabs-custom'> 
                { this.props.children }
            </div>
        )
    }
}

export default Tabs;