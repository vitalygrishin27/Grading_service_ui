import React, {Component} from "react";
import Logging from "../component/Logging";
import {connect} from "react-redux";
import {changeLogin, changePassword, changeToken} from "../component/store/logging/actions";
import {changeUserIdForEdit} from "../component/store/userList/actions";

class LoggingContainer extends Component {
    render() {
        const {login,
            password,
            userIdForEdit,
            changeLogin,
            changePassword,
            changeToken,
            changeUserIdForEdit,
            history} = this.props;
        return (
            <Logging login={login}
                     password={password}
                     userIdForEdit={userIdForEdit}
                     changeLogin={changeLogin}
                     changePassword={changePassword}
                     changeToken={changeToken}
                     changeUserIdForEdit={changeUserIdForEdit}
                     history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.logging.login,
        password: state.logging.password,
        token: state.logging.token,
        userIdForEdit: state.userList.userIdForEdit
    }
}

const mapDispatchToProps = {
    changeLogin: changeLogin,
    changePassword: changePassword,
    changeToken: changeToken,
    changeUserIdForEdit: changeUserIdForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggingContainer);