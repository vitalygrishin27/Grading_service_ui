import React,{Component} from "react";
import Logging from "../component/form/Logging";
import {connect} from "react-redux";
import {changeLogin, changePassword} from "../component/store/logging/actions";

class LoggingContainer extends Component{
    render() {
        const {login, password, changeLogin, changePassword} = this.props;
        return (
            <Logging login={login} password ={password} changeLogin={changeLogin} changePassword={changePassword}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.logging.login,
        password: state.logging.password,
    }
}

const mapDispatchToProps = {
        changeLogin: changeLogin,
        changePassword: changePassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggingContainer);