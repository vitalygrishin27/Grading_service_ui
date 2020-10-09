import React, {Component} from "react";
import {connect} from "react-redux";
import {
    changeCategories, changeCategoryForChangeCriteria,
    changeCategoryForEdit,
    changeCategoryIdForChangeCriteria, changeShowModal
} from "../component/store/categoryList/actions";
import CategoryList from "../component/CategoryList";
import {setOriginalSelectedCriteriaIds, setSelectedCriteria} from "../component/store/modalSelectCriteria/actions";

class CategoryListContainer extends Component {
    render() {
        const {
            categories,
            categoryForEdit,
            categoryIdForChangeCriteria,
            categoryForChangeCriteria,
            showModal,
            selectedCriteria,
            originalSelectedCriteriaIds,

            changeCategories,
            changeCategoryForEdit,
            changeCategoryIdForChangeCriteria,
            changeCategoryForChangeCriteria,
            changeShowModal,
            setSelectedCriteria,
            setOriginalSelectedCriteriaIds,
            history
        } = this.props;
        return (
            <CategoryList categories={categories}
                          categoryForEdit={categoryForEdit}
                          categoryIdForChangeCriteria={categoryIdForChangeCriteria}
                          categoryForChangeCriteria={categoryForChangeCriteria}
                          showModal={showModal}
                          selectedCriteria={selectedCriteria}
                          originalSelectedCriteriaIds={originalSelectedCriteriaIds}

                          changeCategories={changeCategories}
                          changeCategoryForEdit={changeCategoryForEdit}
                          changeCategoryIdForChangeCriteria={changeCategoryIdForChangeCriteria}
                          changeCategoryForChangeCriteria={changeCategoryForChangeCriteria}
                          changeShowModal={changeShowModal}
                          setSelectedCriteria={setSelectedCriteria}
                          setOriginalSelectedCriteriaIds={setOriginalSelectedCriteriaIds}
                          history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList.categories,
        categoryForEdit: state.categoryList.categoryForEdit,
        categoryIdForChangeCriteria: state.categoryList.categoryIdForChangeCriteria,
        categoryForChangeCriteria: state.categoryList.categoryForChangeCriteria,
        showModal: state.categoryList.showModal,
        selectedCriteria: state.categoryList.selectedCriteria,
        originalSelectedCriteriaIds: state.categoryList.originalSelectedCriteriaIds
    }
}

const mapDispatchToProps = {
    changeCategories: changeCategories,
    changeCategoryForEdit: changeCategoryForEdit,
    changeCategoryIdForChangeCriteria:changeCategoryIdForChangeCriteria,
    changeCategoryForChangeCriteria:changeCategoryForChangeCriteria,
    changeShowModal:changeShowModal,
    setSelectedCriteria:setSelectedCriteria,
    setOriginalSelectedCriteriaIds:setOriginalSelectedCriteriaIds
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);