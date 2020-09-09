import React, {Component} from "react";
import {connect} from "react-redux";
import NavigationBar from "../component/NavigationBar";
import {changeToken} from "../component/store/logging/actions";

class NavigationBarContainer extends Component {
    render() {
        const {token, history} = this.props;
        return (
            <NavigationBar token={token} history={history}/>
        );
    }
}

const
    mapStateToProps = (state) => {
        return {
            token: state.logging.token,
        }
    }

const
    mapDispatchToProps = {
        changeToken: changeToken,
    }

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarContainer);