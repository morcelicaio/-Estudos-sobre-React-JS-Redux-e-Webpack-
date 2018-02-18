import React, { Component } from 'react'

import Grid from '../layout/grid';

class ValueBox extends Component{    

    render(){                
        return(
            <Grid cols={ this.props.cols }>
                <div className={`small-box bg-${ this.props.color }`} >
                    <div className="inner" > 
                        <h3> { this.props.value } </h3>
                        <p> { this.props.text } </p>
                    </div>

                    <div className="icon" >               
                        <i className={ `fa fa-${ this.props.icon }` }> </i> 
                    </div>
                </div>
           </Grid>
        )
    }
};

export default ValueBox;