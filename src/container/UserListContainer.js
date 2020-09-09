import React, {Component} from "react";
import {connect} from "react-redux";
import {changeUserIdForEdit, changeUsers} from "../component/store/userList/actions";
import UserList from "../component/UserList";

class UserListContainer extends Component {
    render() {
        const {users, userIdForEdit, changeUsers, changeUserIdForEdit, history} = this.props;
        return (
            <UserList users={users}
                      userIdForEdit={userIdForEdit}
                      changeUsers={changeUsers}
                      changeUserIdForEdit={changeUserIdForEdit}
                      history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userList.users,
        changeUserIdForEdit: state.userList.userIdForEdit,
    }
}

const mapDispatchToProps = {
    changeUsers: changeUsers,
    changeUserIdForEdit: changeUserIdForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);