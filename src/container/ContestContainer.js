import React, {Component} from "react";
import {connect} from "react-redux";
import Contest from "../component/Contest";
import {changeContestIdForEdit} from "../component/store/contestList/actions";
import {changeName, changePhoto} from "../component/store/contest/actions";

class ContestContainer extends Component {
    render() {
        const {
            name,
            photo,
            contestIdForEdit,
            changeName,
            changePhoto,
            changeContestIdForEdit,
            history
        } = this.props;
        return (
            <Contest name={name}
                     photo={photo}
                     contestIdForEdit={contestIdForEdit}
                     changeName={changeName}
                     changePhoto={changePhoto}
                     changeContestIdForEdit={changeContestIdForEdit}
                     history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.contest.name,
        photo: state.contest.photo,
        contestIdForEdit: state.contestList.contestIdForEdit,
    }
}

const mapDispatchToProps = {
    changeName: changeName,
    changePhoto: changePhoto,
    changeContestIdForEdit: changeContestIdForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestContainer);