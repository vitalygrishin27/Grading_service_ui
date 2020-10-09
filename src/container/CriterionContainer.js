import React, {Component} from "react";
import {connect} from "react-redux";
import {
    changeCriterionDescription,
    changeCriterionForEdit,
    changeCriterionName
} from "../component/store/criterionList/actions";
import Criterion from "../component/Criterion";

class CriterionContainer extends Component {
    render() {
        const {
            name,
            description,
            criterionForEdit,
            changeCriterionName,
            changeCriterionDescription,
            changeCriterionForEdit,
            history
        } = this.props;
        return (
            <Criterion name={name}
                         description={description}
                         criterionForEdit={criterionForEdit}
                         changeCriterionName={changeCriterionName}
                         changeCriterionDescription={changeCriterionDescription}
                         changeCriterionForEdit={changeCriterionForEdit}
                     history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.criterionList.criterionForEdit.name,
        description: state.criterionList.criterionForEdit.description,
        criterionForEdit: state.criterionList.criterionForEdit,
    }
}

const mapDispatchToProps = {
    changeCriterionName: changeCriterionName,
    changeCriterionDescription: changeCriterionDescription,
    changeCriterionForEdit: changeCriterionForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(CriterionContainer);