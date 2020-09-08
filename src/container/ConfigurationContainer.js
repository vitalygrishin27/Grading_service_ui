import React, {Component} from "react";
import {changeContestName} from "../component/store/configuration/actions";
import {connect} from "react-redux";
import Configuration from "../component/form/Configuration";

class ConfigurationContainer extends Component {
    render() {
        const {contestName, changeContestName} = this.props;
        return (
            <Configuration contestName={contestName} changeContestName={changeContestName}/>
        );
    }
}

const
    mapStateToProps = (state) => {
        return {
            contestName: state.configuration.contestName,
        }
    }

const
    mapDispatchToProps = {
        changeContestName: changeContestName,
    }

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationContainer);