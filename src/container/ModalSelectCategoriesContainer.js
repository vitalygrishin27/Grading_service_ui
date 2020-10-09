import React, {Component} from "react";
import {connect} from "react-redux";
import {
    addCategoryToList,
    changeCategories,
    removeCategoryFromList,
    setOriginalSelectedCategoriesIds,
    setSelectedCategories
} from "../component/store/modalSelectCategories/actions";
import ModalSelectCategories from "../component/ModalSelectCategories";
import {changeShowModal} from "../component/store/categoryList/actions";
import {changeContestIdForChangeCategories} from "../component/store/contestList/actions";

class ModalSelectCategoriesContainer extends Component {
    render() {
        const {
            categories,
            showModal,
            contestIdForChangeCategories,
            contestForChangeCategories,
            selectedCategories,
            selectedCategoriesIds,
            originalSelectedCategoriesIds,
            changeCategories,
            changeContestIdForChangeCategories,
            changeShowModal,
            addCategoryToList,
            removeCategoryFromList,
            setSelectedCategories,
            setOriginalSelectedCategoriesIds,
            history
        } = this.props;
        return (
            <ModalSelectCategories showModal={showModal}
                                   categories={categories}
                                   contestIdForChangeCategories={contestIdForChangeCategories}
                                   selectedCategories={selectedCategories}
                                   originalSelectedCategoriesIds={originalSelectedCategoriesIds}
                                   changeCategories={changeCategories}
                                   selectedCategoriesIds={selectedCategoriesIds}
                                   contestForChangeCategories={contestForChangeCategories}
                                   changeContestIdForChangeCategories={changeContestIdForChangeCategories}
                                   changeShowModal={changeShowModal}
                                   addCategoryToList={addCategoryToList}
                                   removeCategoryFromList={removeCategoryFromList}
                                   setSelectedCategories={setSelectedCategories}
                                   setOriginalSelectedCategoriesIds={setOriginalSelectedCategoriesIds}
                                   history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.contestList.showModal,
        categories: state.modalSelectCategories.categories,
        contestIdForChangeCategories: state.contestList.contestIdForChangeCategories,
        selectedCategories: state.modalSelectCategories.selectedCategories,
        selectedCategoriesIds: state.modalSelectCategories.selectedCategoriesIds,
        originalSelectedCategoriesIds: state.modalSelectCategories.originalSelectedCategoriesIds,
        contestForChangeCategories: state.contestList.contestForChangeCategories,
    }
}

const mapDispatchToProps = {
    changeShowModal: changeShowModal,
    changeCategories: changeCategories,
    addCategoryToList: addCategoryToList,
    removeCategoryFromList: removeCategoryFromList,
    changeContestIdForChangeCategories: changeContestIdForChangeCategories,
    setSelectedCategories: setSelectedCategories,
    setOriginalSelectedCategoriesIds: setOriginalSelectedCategoriesIds,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSelectCategoriesContainer);