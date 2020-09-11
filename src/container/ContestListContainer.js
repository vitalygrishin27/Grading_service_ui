import React, {Component} from "react";
import {connect} from "react-redux";
import {changeContestIdForEdit, changeContests} from "../component/store/contestList/actions";
import ContestList from "../component/ContestList";

class ContestListContainer extends Component {
    render() {
        const {contests, contestIdForEdit, changeContests, changeContestIdForEdit, history} = this.props;
        return (
            <ContestList contests={contests}
                      contestIdForEdit={contestIdForEdit}
                      changeContests={changeContests}
                      changeContestIdForEdit={changeContestIdForEdit}
                      history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contests: state.contestList.contests,
        contestIdForEdit: state.contestList.contestIdForEdit,
    }
}

const mapDispatchToProps = {
    changeContests: changeContests,
    changeContestIdForEdit: changeContestIdForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestListContainer);