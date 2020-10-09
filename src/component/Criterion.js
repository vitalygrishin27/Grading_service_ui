import React, {Component} from "react";
import {Form, Button, Col} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getEndpoint, getOptions, CRITERIA_MAIN_ENDPOINT} from "./Welcome";

export default class Criterion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
        };
        this.changeCriterionName = this.changeCriterionName.bind(this);
        this.changeCriterionDescription = this.changeCriterionDescription.bind(this);
    }

    changeCriterionName(event) {
        this.props.changeCriterionName(event.target.value);
    }

    changeCriterionDescription(event) {
        this.props.changeCriterionDescription(event.target.value);
    }

    changeCriterionForEdit(criterionForEdit) {
        this.props.changeCriterionForEdit(criterionForEdit);
    }


    saveCriterion = event => {
        event.preventDefault();
        axios.post(getEndpoint(CRITERIA_MAIN_ENDPOINT), JSON.stringify(this.props.criterionForEdit), getOptions())
            .then((res) => {
                this.setState({
                    show: true,
                    error: false,
                    message: 'Дані критерія оцінювання збережено!'
                });
                this.props.changeCriterionName('');
                this.props.changeCriterionDescription('');
                this.props.changeCriterionForEdit({});
                setTimeout(() => this.setState({"show": false}), 3000);
                setTimeout(() => this.props.history.push('/criteria'), 3000);
            })
            .catch((error) => {
                console.error("Error" + error);
                if (error.response && error.response.status === 403) {
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
                } else {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Помилка при збереженні даних критерія оцінювання'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

  /*  findPerformanceById = (performanceId) => {
        axios.get(getEndpoint(CONTESTS_MAIN_ENDPOINT) + "/" + performanceId, getOptions())
            .then(response => {
                this.props.changeName(response.data.name);
                this.props.changePhoto(response.data.photo);
            })
            .catch((error) => {
                console.error("Error" + error);
                if (error.response && error.response.status === 403) {
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
                } else {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Помилка при завантаженні даних конкурсу'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

*/
    render() {
        const {
            name,
            description,
        } = this.props;
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
                <Form className={"text-white text-muted"} onSubmit={this.saveCriterion}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputName">Назва</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={name}
                                onChange={this.changeCriterionName}
                                id="inputName"
                                aria-describedby="inputNameHelpInline"
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputDescription">Деталі</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={description}
                                onChange={this.changeCriterionDescription}
                                id="inputDescription"
                                aria-describedby="inputDescriptionHelpInline"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button type="submit">Зберегти</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}



