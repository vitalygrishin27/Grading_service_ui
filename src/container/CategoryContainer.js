import React, {Component} from "react";
import {connect} from "react-redux";
import {
    changeCategoryDescription,
    changeCategoryForEdit,
    changeCategoryName
} from "../component/store/categoryList/actions";
import Category from "../component/Category";

class CategoryContainer extends Component {
    render() {
        const {
            name,
            description,
            categoryForEdit,
            changeCategoryName,
            changeCategoryDescription,
            changeCategoryForEdit,
            history
        } = this.props;
        return (
            <Category name={name}
                         description={description}
                       categoryForEdit={categoryForEdit}
                       changeCategoryName={changeCategoryName}
                       changeCategoryDescription={changeCategoryDescription}
                       changeCategoryForEdit={changeCategoryForEdit}
                     history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.categoryList.categoryForEdit.name,
        description: state.categoryList.categoryForEdit.description,
        categoryForEdit: state.categoryList.categoryForEdit,
    }
}

const mapDispatchToProps = {
    changeCategoryName: changeCategoryName,
    changeCategoryDescription: changeCategoryDescription,
    changeCategoryForEdit: changeCategoryForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);