import React, {Component} from "react";
import Logging from "../component/Logging";
import {connect} from "react-redux";
import {changeLogin, changePassword, changeToken} from "../component/store/logging/actions";

class LoggingContainer extends Component {
    render() {
        const {login, password, changeLogin, changePassword, changeToken, history} = this.props;
        return (
            <Logging login={login} password={password} changeLogin={changeLogin} changePassword={changePassword}
                     changeToken={changeToken} history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.logging.login,
        password: state.logging.password,
        token: state.logging.token,
    }
}

const mapDispatchToProps = {
    changeLogin: changeLogin,
    changePassword: changePassword,
    changeToken: changeToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggingContainer);