import React, {Component} from "react";
import {connect} from "react-redux";
import {changeUsers} from "../component/store/userList/actions";
import UserList from "../component/UserList";

class UserListContainer extends Component {
    render() {
        const {users, changeUsers, history} = this.props;
        return (
            <UserList users={users} changeUsers={changeUsers} history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userList.users,
    }
}

const mapDispatchToProps = {
    changeUsers: changeUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);