import React, { Component } from 'react';

class TabsContent extends Component{
    render(){
        return(
            <div className='tab-content'>
                { this.props.children }
            </div>
        );
    }
}

export default TabsContent;