import React, {Component} from "react";
import {connect} from "react-redux";
import User from "../component/User";
import {
    changeFirstName,
    changeLastName,
    changeLogin,
    changePassword, changePhoto, changePosition, changeRole, changeRoleList,
    changeSecondName, changeUserIdForEdit
} from "../component/store/user/actions";
import {changeUserForEdit} from "../component/store/userList/actions";

class UserContainer extends Component {
    render() {
        const {
            login,
            password,
            lastName,
            firstName,
            secondName,
            position,
            role,
            photo,
            roleList,
            userIdForEdit,
            userForEdit,
            changeLogin,
            changePassword,
            changeLastName,
            changeFirstName,
            changeSecondName,
            changePosition,
            changeRole,
            changePhoto,
            changeRoleList,
            changeUserIdForEdit,
            changeUserForEdit,
            history
        } = this.props;
        return (
            <User login={login}
                  password={password}
                  lastName={lastName}
                  firstName={firstName}
                  secondName={secondName}
                  position={position}
                  role={role}
                  photo={photo}
                  roleList={roleList}
                  userIdForEdit={userIdForEdit}
                  userForEdit={userForEdit}
                  changeLogin={changeLogin}
                  changePassword={changePassword}
                  changeLastName={changeLastName}
                  changeFirstName={changeFirstName}
                  changeSecondName={changeSecondName}
                  changePosition={changePosition}
                  changeRole={changeRole}
                  changePhoto={changePhoto}
                  changeRoleList={changeRoleList}
                  changeUserIdForEdit={changeUserIdForEdit}
                  changeUserForEdit={changeUserForEdit}
                  history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.user.login,
        password: state.user.password,
        lastName: state.user.lastName,
        firstName: state.user.firstName,
        secondName: state.user.secondName,
        position: state.user.position,
        role: state.user.role,
        photo: state.user.photo,
        roleList: state.user.roleList,
        userIdForEdit: state.user.userIdForEdit,
        userForEdit:state.userList.userForEdit,
    }
}

const mapDispatchToProps = {
    changeLogin: changeLogin,
    changePassword: changePassword,
    changeLastName: changeLastName,
    changeFirstName: changeFirstName,
    changeSecondName: changeSecondName,
    changePosition: changePosition,
    changeRole: changeRole,
    changePhoto: changePhoto,
    changeRoleList: changeRoleList,
    changeUserIdForEdit: changeUserIdForEdit,
    changeUserForEdit:changeUserForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);