import React, {Component} from "react";
import {connect} from "react-redux";
import {
    changeContestForChangeCategories, changeContestForEdit,
    changeContestIdForChangeCategories,
    changeContestIdForEdit,
    changeContests, changeShowModal
} from "../component/store/contestList/actions";
import ContestList from "../component/ContestList";

import {
    setOriginalSelectedCategoriesIds,
    setSelectedCategories
} from "../component/store/modalSelectCategories/actions";

class ContestListContainer extends Component {
    render() {
        const {
            contests,
            contestIdForEdit,
            contestForEdit,
            changeContests,
            changeContestIdForEdit,
            changeContestForEdit,
            contestIdForChangeCategories,
            contestForChangeCategories,
            showModal,
            selectedCategories,
            originalSelectedCategoriesIds,
            changeContestIdForChangeCategories,
            changeContestForChangeCategories,
            changeShowModal,
            setSelectedCategories,
            setOriginalSelectedCategoriesIds,
            history
        } = this.props;
        return (
            <ContestList contests={contests}
                         contestIdForEdit={contestIdForEdit}
                         contestForEdit={contestForEdit}
                         contestIdForChangeCategories={contestIdForChangeCategories}
                         contestForChangeCategories={contestForChangeCategories}
                         showModal={showModal}
                         selectedCategories={selectedCategories}
                         originalSelectedCategoriesIds={originalSelectedCategoriesIds}

                         changeContests={changeContests}
                         changeContestIdForEdit={changeContestIdForEdit}
                         changeContestForEdit={changeContestForEdit}
                         changeContestIdForChangeCategories={changeContestIdForChangeCategories}
                         changeContestForChangeCategories={changeContestForChangeCategories}
                         changeShowModal={changeShowModal}
                         setSelectedCategories={setSelectedCategories}
                         setOriginalSelectedCategoriesIds={setOriginalSelectedCategoriesIds}
                         history={history}

            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contests: state.contestList.contests,
        contestIdForEdit: state.contestList.contestIdForEdit,
        contestIdForChangeCategories: state.contestList.contestIdForChangeCategories,
        contestForChangeCategories: state.contestList.contestForChangeCategories,
        showModal: state.contestList.showModal,
        selectedCategories: state.contestList.selectedCategories,
        originalSelectedCategoriesIds: state.contestList.originalSelectedCategoriesIds
    }
}

const mapDispatchToProps = {
    changeContests: changeContests,
    changeContestIdForEdit: changeContestIdForEdit,
    changeContestForEdit: changeContestForEdit,
    changeContestIdForChangeCategories: changeContestIdForChangeCategories,
    changeContestForChangeCategories: changeContestForChangeCategories,
    changeShowModal: changeShowModal,
    setSelectedCategories: setSelectedCategories,
    setOriginalSelectedCategoriesIds: setOriginalSelectedCategoriesIds,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestListContainer);