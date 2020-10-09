import React, {Component} from "react";
import {Form, Button, Col} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getEndpoint, getOptions, CATEGORIES_MAIN_ENDPOINT} from "./Welcome";

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
        };
        this.changeCategoryName = this.changeCategoryName.bind(this);
        this.changeCategoryDescription = this.changeCategoryDescription.bind(this);
    }

    changeCategoryName(event) {
        this.props.changeCategoryName(event.target.value);
    }

    changeCategoryDescription(event) {
        this.props.changeCategoryDescription(event.target.value);
    }

    changeCategoryForEdit(categoryForEdit) {
        this.props.changeCategoryForEdit(categoryForEdit);
    }


    saveCategory = event => {
        event.preventDefault();
        axios.post(getEndpoint(CATEGORIES_MAIN_ENDPOINT)+"/onlyName", JSON.stringify(this.props.categoryForEdit), getOptions())
            .then((res) => {
                this.setState({
                    show: true,
                    error: false,
                    message: 'Дані категорії збережено!'
                });
                this.props.changeCategoryName('');
                this.props.changeCategoryDescription('');
                this.props.changeCategoryForEdit({});
                setTimeout(() => this.setState({"show": false}), 3000);
                setTimeout(() => this.props.history.push('/categories'), 3000);
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
                        message: 'Помилка при збереженні даних категорії'
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
                <Form className={"text-white text-muted"} onSubmit={this.saveCategory}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputName">Назва</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={name}
                                onChange={this.changeCategoryName}
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
                                onChange={this.changeCategoryDescription}
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



