import React, {Component} from "react";
import {Form, Button} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeContestName} from "../store/actions";
import axios from 'axios';

const createConfigurationType = (configKey, configValue) => {
    return {
        configKey: configKey,
        configValue: configValue,
    }
}

const createWrapperConfigurationType = (configList) => {
    return {
        configurations: configList,
    }
}

class Configuration extends Component {

    getSettings = () => {
        axios.get(localStorage.getItem("host") + "configuration")
            .then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error" + error);
            });
    };

    saveSettings = event => {
        event.preventDefault();
        const options = {
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        };

        let configurations = [];
        configurations.push(createConfigurationType("contestName", this.props.contestName));
        axios.post(localStorage.getItem("host") + "configuration", JSON.stringify(createWrapperConfigurationType(configurations)), options)
            .then((res) => {
                console.log(res);
            });
    }

    componentDidMount() {
        this.getSettings();
    }

    render() {
        const {contestName, changeContestName} = this.props;
        return (
            <Form inline className={"text-white text-muted"} onSubmit={this.saveSettings}>
                <Form.Group>
                    <Form.Label htmlFor="inputNameConquest">Назва конкурсу</Form.Label>
                    <Form.Control
                        type="text"
                        width="100%"
                        className="mx-sm-3"
                        value={contestName}
                        onChange={(event) => {
                            changeContestName(event.target.value)
                        }}
                        id="inputNameConquest"
                        aria-describedby="inputNameConquestHelpInline"
                    />
                </Form.Group>
                <Button type="submit">Зберегти</Button>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contestName: state.contestName,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeContestName: bindActionCreators(changeContestName, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);



