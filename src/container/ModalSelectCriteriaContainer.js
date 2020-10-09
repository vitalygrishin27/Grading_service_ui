import React, {Component} from "react";
import {connect} from "react-redux";
import {
    addCriterionToList,
    changeCriteria,
    removeCriterionFromList,
    setOriginalSelectedCriteriaIds,
    setSelectedCriteria
} from "../component/store/modalSelectCriteria/actions";
import {changeShowModal, changeCategoryIdForChangeCriteria} from "../component/store/categoryList/actions";
import ModalSelectCriteria from "../component/ModalSelectCriteria";

class ModalSelectCriteriaContainer extends Component {
    render() {
        const {
            criteria,
            showModal,
            categoryIdForChangeCriteria,
            categoryForChangeCriteria,
            selectedCriteria,
            selectedCriteriaIds,
            originalSelectedCriteriaIds,
            changeCriteria,
            changeCategoryIdForChangeCriteria,
            changeShowModal,
            addCriterionToList,
            removeCriterionFromList,
            setSelectedCriteria,
            setOriginalSelectedCriteriaIds,
            history
        } = this.props;
        return (
            <ModalSelectCriteria showModal={showModal}
                                criteria={criteria}
                                categoryIdForChangeCriteria={categoryIdForChangeCriteria}
                                selectedCriteria={selectedCriteria}
                                originalSelectedCriteriaIds ={originalSelectedCriteriaIds}
                                changeCriteria={changeCriteria}
                                selectedCriteriaIds={selectedCriteriaIds}
                                categoryForChangeCriteria={categoryForChangeCriteria}
                                changeCategoryIdForChangeCriteria={changeCategoryIdForChangeCriteria}
                                changeShowModal={changeShowModal}
                                addCriterionToList={addCriterionToList}
                                removeCriterionFromList={removeCriterionFromList}
                                setSelectedCriteria={setSelectedCriteria}
                                setOriginalSelectedCriteriaIds={setOriginalSelectedCriteriaIds}
                                history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.categoryList.showModal,
        criteria: state.modalSelectCriteria.criteria,
        categoryIdForChangeCriteria: state.categoryList.categoryIdForChangeCriteria,
        selectedCriteria: state.modalSelectCriteria.selectedCriteria,
        selectedCriteriaIds: state.modalSelectCriteria.selectedCriteriaIds,
        originalSelectedCriteriaIds: state.modalSelectCriteria.originalSelectedCriteriaIds,
        categoryForChangeCriteria:state.categoryList.categoryForChangeCriteria,
    }
}

const mapDispatchToProps = {
    changeShowModal: changeShowModal,
    changeCriteria: changeCriteria,
    addCriterionToList: addCriterionToList,
    removeCriterionFromList: removeCriterionFromList,
    changeCategoryIdForChangeCriteria : changeCategoryIdForChangeCriteria,
    setSelectedCriteria:setSelectedCriteria,
    setOriginalSelectedCriteriaIds:setOriginalSelectedCriteriaIds,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSelectCriteriaContainer);