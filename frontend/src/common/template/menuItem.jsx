import React from 'react';

import { Link } from 'react-router';

class MenuItem extends React.Component{
    render(){
        return(
            <li> 
                <Link to={ this.props.link } > 
                    <i className={ ` fa fa-${ this.props.icon } ` } > </i> <span>{ this.props.nameMenuItem } </span>                 
                </Link>
            </li>
        )
    }
}

export default MenuItem;