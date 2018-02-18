import React, { Component } from 'react';

class TabsHeader extends Component{
    render(){
        return(
            <ul className='nav nav-tabs'>    
                { this.props.children }
            </ul>
        );
    }
}

export default TabsHeader