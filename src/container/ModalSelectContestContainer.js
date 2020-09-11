import React, {Component} from "react";
import {connect} from "react-redux";
import ModalSelectContest from "../component/ModalSelectContest";
import {
    addContestToList,
    changeContests,
    removeContestFromList,
    setOriginalSelectedContestIds,
    setSelectedContests
} from "../component/store/modalSelectContest/actions";
import {changeShowModal, changeUserIdForChangeContest} from "../component/store/userList/actions";

class ModalSelectContestContainer extends Component {
    render() {
        const {
            contests,
            showModal,
            userIdForChangeContest,
            userForChangeContest,
            selectedContests,
            selectedContestIds,
            originalSelectedContestIds,
            changeContests,
            changeUserIdForChangeContest,
            changeShowModal,
            addContestToList,
            removeContestFromList,
            setSelectedContests,
            setOriginalSelectedContestIds,
            history
        } = this.props;
        return (
            <ModalSelectContest showModal={showModal}
                                contests={contests}
                                userIdForChangeContest={userIdForChangeContest}
                                selectedContests={selectedContests}
                                originalSelectedContestIds ={originalSelectedContestIds}
                                changeContests={changeContests}
                                selectedContestIds={selectedContestIds}
                                userForChangeContest={userForChangeContest}
                                changeUserIdForChangeContest={changeUserIdForChangeContest}
                                changeShowModal={changeShowModal}
                                addContestToList={addContestToList}
                                removeContestFromList={removeContestFromList}
                                setSelectedContests={setSelectedContests}
                                setOriginalSelectedContestIds={setOriginalSelectedContestIds}
                                history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.userList.showModal,
        contests: state.modalSelectContest.contests,
        userIdForChangeContest: state.userList.userIdForChangeContest,
        selectedContests: state.modalSelectContest.selectedContests,
        selectedContestIds: state.modalSelectContest.selectedContestIds,
        originalSelectedContestIds: state.modalSelectContest.originalSelectedContestIds,
        userForChangeContest:state.userList.userForChangeContest,
    }
}

const mapDispatchToProps = {
    changeShowModal: changeShowModal,
    changeContests: changeContests,
    addContestToList: addContestToList,
    removeContestFromList: removeContestFromList,
    changeUserIdForChangeContest : changeUserIdForChangeContest,
    setSelectedContests:setSelectedContests,
    setOriginalSelectedContestIds:setOriginalSelectedContestIds,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSelectContestContainer);