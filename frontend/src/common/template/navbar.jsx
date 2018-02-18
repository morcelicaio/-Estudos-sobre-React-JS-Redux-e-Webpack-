// usando as classes css do admin-LTE
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../auth/authActions'; // importando o metodo de logout 

class NavBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            // verifica se o estado do dropdow do avatar estará aberto ou fechado.
            open: false
        }
    }

    changeOpen(){        
        this.setState({
            open: !this.state.open
        })
    }

    render(){
        const { name, email } = this.props.user;

        return(
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">

                    {/* onMouseLeave é o evento de quando o usuário retira o mouse dá área especifica. 
                        Nesse caso ele mudará o estado e a partir disso muda o className p/ fazer o dropdown ou ñ.*/}
                    <li onMouseLeave={() => this.changeOpen()}
                        className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
                        <a href="javascript:;" onClick={() => this.changeOpen()}
                            aria-expanded={this.state.open ? 'true' : 'false'}
                            className="dropdown-toggle"
                            data-toggle="dropdown">
                            <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAemAAAAJDcyM2FkZjNmLWJkYTQtNDVmOC1hMTZjLTBiYjcxNWY0Zjg3YQ.jpg"
                                className="user-image" alt="User Image" />
                            <span className="hidden-xs">{name}</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="user-header">
                                <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAemAAAAJDcyM2FkZjNmLWJkYTQtNDVmOC1hMTZjLTBiYjcxNWY0Zjg3YQ.jpg"
                                    className="img-circle" alt="User Image" />
                                <p>{ name }<small>{ email }</small></p>
                            </li>
                            <li className="user-footer">
                                <div className="pull-right">
                                    <a href="#" onClick={ this.props.logout }
                                        className="btn btn-default btn-flat">Sair</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToPros = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToPros)(NavBar);
