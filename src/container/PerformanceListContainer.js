import React, {Component} from "react";
import {connect} from "react-redux";
import PerformanceList from "../component/PerformanceList";
import {changePerformanceForEdit, changePerformances} from "../component/store/performanceList/actions";

class PerformanceListContainer extends Component {
    render() {
        const {performances, performanceForEdit, changePerformances, changePerformanceForEdit, userMasterOfPerformance, history} = this.props;
        return (
            <PerformanceList performances={performances}
                             performanceForEdit={performanceForEdit}
                             changePerformances={changePerformances}
                             changePerformanceForEdit={changePerformanceForEdit}
                             userMasterOfPerformance={userMasterOfPerformance}
                             history={history}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        performances: state.performanceList.performances,
        performanceForEdit: state.performanceList.performanceForEdit,
    }
}

const mapDispatchToProps = {
    changePerformances: changePerformances,
    changePerformanceForEdit: changePerformanceForEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceListContainer);