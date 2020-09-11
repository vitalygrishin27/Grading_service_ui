import React, {Component} from "react";
import {connect} from "react-redux";
import {
    changeShowModal, changeUserForChangeContest, changeUserForEdit,
    changeUserIdForChangeContest,
    changeUserIdForEdit,
    changeUsers
} from "../component/store/userList/actions";
import UserList from "../component/UserList";
import {setOriginalSelectedContestIds, setSelectedContests} from "../component/store/modalSelectContest/actions";

class UserListContainer extends Component {
    render() {
        const {
            users,
            userIdForEdit,
            userForEdit,
            userIdForChangeContest,
            userForChangeContest,
            showModal,
            selectedContests,
            originalSelectedContestIds,

            changeUsers,
            changeUserIdForEdit,
            changeUserForEdit,
            changeUserIdForChangeContest,
            changeUserForChangeContest,
            changeShowModal,
            setSelectedContests,
            setOriginalSelectedContestIds,
            history
        } = this.props;
        return (
            <UserList users={users}
                      userIdForEdit={userIdForEdit}
                      userForEdit={userForEdit}
                      userIdForChangeContest={userIdForChangeContest}
                      showModal={showModal}
                      selectedContests={selectedContests}
                      originalSelectedContestIds={originalSelectedContestIds}
                      userForChangeContest={userForChangeContest}
                      changeUsers={changeUsers}
                      changeUserForEdit={changeUserForEdit}
                      changeUserIdForEdit={changeUserIdForEdit}
                      changeUserIdForChangeContest={changeUserIdForChangeContest}
                      changeShowModal={changeShowModal}
                      setSelectedContests={setSelectedContests}
                      setOriginalSelectedContestIds={setOriginalSelectedContestIds}
                      changeUserForChangeContest={changeUserForChangeContest}
                      history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.modalSelectContest.showModal,
        users: state.userList.users,
        userIdForEdit: state.userList.userIdForEdit,
        userIdForChangeContest: state.userList.userIdForChangeContest,
        selectedContests: state.modalSelectContest.selectedContests,
        originalSelectedContestIds: state.modalSelectContest.originalSelectedContestIds,
        userForChangeContest: state.userList.userForChangeContest,
        userForEdit:state.userList.userForEdit,
    }
}

const mapDispatchToProps = {
    changeUsers: changeUsers,
    changeUserIdForEdit: changeUserIdForEdit,
    changeUserIdForChangeContest: changeUserIdForChangeContest,
    changeShowModal: changeShowModal,
    setSelectedContests: setSelectedContests,
    setOriginalSelectedContestIds: setOriginalSelectedContestIds,
    changeUserForChangeContest: changeUserForChangeContest,
    changeUserForEdit:changeUserForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);