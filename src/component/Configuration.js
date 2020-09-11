import React, {Component} from "react";
import {Form, Button} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";

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

export default class Configuration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
        };
        this.changeContestName = this.changeContestName.bind(this);
    }

    changeContestName(event) {
        this.props.changeContestName(event.target.value);
    }

    getSettings = () => {
        const options = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'gradingServiceAccessToken': localStorage.getItem("gradingServiceAccessToken"),
            }
        };
        axios.get(localStorage.getItem("host") + "configuration", options)
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].configKey === 'contestName') {
                        this.props.changeContestName(response.data[i].configValue);
                    }
                }

            })
            .catch((error) => {
                console.error("Error" + error);
                if(error.response && error.response.status===403){
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Сесія була закінчена. Авторизуйтесь!'
                    });
                    localStorage.removeItem("gradingServiceAccessToken");
                    if (this.props.history) {
                        setTimeout(() => this.props.history.push('/login'), 3000);
                    } else {
                        setTimeout(() => document.location.href = "/login", 3000);
                    }
                }else {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Помилка при завантаженні конфігурації'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    };

    saveSettings = event => {
        const options = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'gradingServiceAccessToken': localStorage.getItem("gradingServiceAccessToken"),
            }
        };
        event.preventDefault();

        let configurations = [];
        configurations
            .push(createConfigurationType("contestName", this.props.contestName));
        axios
            .post(localStorage.getItem("host") + "configuration", JSON.stringify(createWrapperConfigurationType(configurations)), options)
            .then((res) => {
                this.setState({
                    show: true,
                    error: false,
                    message: 'Конфігурація збережена'
                });
                setTimeout(() => this.setState({"show": false}), 3000);
                setTimeout(() => this.props.history.push('/'), 3000);
            })
            .catch((error) => {
                console.error("Error" + error);
                if(error.response && error.response.status===403){
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Сесія була закінчена. Авторизуйтесь!'
                    });
                    localStorage.removeItem("gradingServiceAccessToken");
                    if (this.props.history) {
                        setTimeout(() => this.props.history.push('/login'), 3000);
                    } else {
                        setTimeout(() => document.location.href = "/login", 3000);
                    }
                }else{
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Помилка при збереженні конфігурації'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    componentDidMount() {
        this.getSettings();
    }

    render() {
        const {contestName} = this.props;
        const {show, error, message} = this.state;
        return (
            <div>
                <div style={{"display": show ? "block" : "none"}}>
                    <ToastMessage
                        show={show}
                        error={error}
                        message={message}
                    />
                </div>
                <Form inline className={"text-white text-muted"} onSubmit={this.saveSettings}>
                    <Form.Group>
                        <Form.Label htmlFor="inputNameConquest">Назва конкурсу</Form.Label>
                        <Form.Control
                            type="text"
                            width="100%"
                            className="mx-sm-3"
                            value={contestName}
                            onChange={this.changeContestName}

                            id="inputNameConquest"
                            aria-describedby="inputNameConquestHelpInline"
                        />
                    </Form.Group>
                    <Button type="submit">Зберегти</Button>
                </Form>
            </div>
        );
    }
}



