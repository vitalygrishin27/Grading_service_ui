import React, {Component} from "react";
import {connect} from "react-redux";
import CriterionList from "../component/CriterionList";
import {changeCriteria, changeCriterionForEdit} from "../component/store/criterionList/actions";

class CriterionListContainer extends Component {
    render() {
        const {criteria, criterionForEdit, changeCriteria, changeCriterionForEdit, history} = this.props;
        return (
            <CriterionList criteria={criteria}
                           criterionForEdit={criterionForEdit}
                           changeCriteria={changeCriteria}
                           changeCriterionForEdit={changeCriterionForEdit}
                           history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        criteria: state.criterionList.criteria,
        criterionForEdit: state.criterionList.criterionForEdit,
    }
}

const mapDispatchToProps = {
    changeCriteria: changeCriteria,
    changeCriterionForEdit: changeCriterionForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(CriterionListContainer);