import React, {Component} from "react";
import {connect} from "react-redux";
import Performance from "../component/Performance";
import {
    changePerformanceDescription,
    changePerformanceForEdit,
    changePerformanceName
} from "../component/store/performanceList/actions";

class PerformanceContainer extends Component {
    render() {
        const {
            name,
            description,
            performanceForEdit,
            changePerformanceName,
            changePerformanceDescription,
            changePerformanceForEdit,
            history
        } = this.props;
        return (
            <Performance name={name}
                         description={description}
                         performanceForEdit={performanceForEdit}
                         changePerformanceName={changePerformanceName}
                         changePerformanceDescription={changePerformanceDescription}
                         changePerformanceForEdit={changePerformanceForEdit}
                     history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.performanceList.performanceForEdit.name,
        description: state.performanceList.performanceForEdit.description,
        performanceForEdit: state.performanceList.performanceForEdit,
    }
}

const mapDispatchToProps = {
    changePerformanceName: changePerformanceName,
    changePerformanceDescription: changePerformanceDescription,
    changePerformanceForEdit: changePerformanceForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceContainer);