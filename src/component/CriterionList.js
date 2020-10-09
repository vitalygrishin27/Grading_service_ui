import React, {Component} from "react";
import {Button, Table, ButtonGroup} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {CRITERIA_MAIN_ENDPOINT, getEndpoint, getOptions} from "./Welcome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faPlusCircle, faTrash, faRedo} from "@fortawesome/free-solid-svg-icons";

export default class CriterionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
            isLoading: false,
        };
    }

    getAllCriteria = () => {
        this.setState({
            isLoading: true,
        })
        axios.get(getEndpoint(CRITERIA_MAIN_ENDPOINT), getOptions())
            .then(response => {
                this.setState({
                    error: false,
                    isLoading: false,
                })
                console.log(response.data);
                this.props.changeCriteria(response.data);
            })
            .catch((error) => {
                console.error("Error" + error);
                if (error.response && error.response.status === 403) {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Сесія була закінчена. Авторизуйтесь!',
                        isLoading: false,
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
                        message: 'Помилка при завантаженні списку критеріїв',
                        isLoading: false,
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    componentDidMount() {
        this.getAllCriteria();
    }

    deleteCriterion(criterionId) {
        const conf = window.confirm(`Ви впевнені?`);
        if (conf) {
            this.setState({
                isLoading: true,
            })
            axios.delete(getEndpoint(CRITERIA_MAIN_ENDPOINT) + "/" + criterionId, getOptions())
                .then(response => {
                    this.setState({
                        show: true,
                        error: false,
                        isLoading: false,
                        message: 'Критерій оцінювання було видалено'
                    })
                    console.log(response.data);
                    this.getAllCriteria();
                    setTimeout(() => this.setState({"show": false}), 3000);
                })
                .catch((error) => {
                    console.error("Error" + error);
                    if (error.response && error.response.status === 403) {
                        this.setState({
                            show: true,
                            error: true,
                            message: 'Сесія була закінчена. Авторизуйтесь!',
                            isLoading: false,
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
                            message: 'Помилка при видаленні критерія',
                            isLoading: false,
                        });
                    }
                    setTimeout(() => this.setState({"show": false}), 3000);
                });
        }
    }

    selectCriterion(criterion) {
        if (!criterion.id) {
            criterion.id = -1;
        }
        this.props.changeCriterionForEdit(criterion);
        this.props.history.push('/criteria/' + criterion.id);
    }

    render() {
        const {criteria} = this.props;
        const {show, error, message, isLoading} = this.state;
        return (
            <div>
                <div style={{"display": show ? "block" : "none"}}>
                    <ToastMessage
                        show={show}
                        error={error}
                        message={message}
                    />
                </div>
                <Table striped bordered hover variant={"dark"} style={{"width": "50%", 'display': 'table'}}>
                    <thead>
                    <tr>{localStorage.getItem("gradingServiceAccessToken")
                    && localStorage.getItem("role")
                    && (localStorage.getItem("role").match("ADMINISTRATOR")
                        || localStorage.getItem("role").match("MANAGER")) ?
                        <td colSpan={"100"}>
                            <ButtonGroup>
                                <Button className="btn btn-sm btn-outline-warning"
                                        style={{"background": "transparent"}}
                                        onClick={this.selectCriterion.bind(this, {})}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>{'  '}
                                    Додати новий критерій оцінювання
                                </Button>{' '}
                            </ButtonGroup>
                        </td> : <td hidden/>}
                    </tr>
                    <tr>
                        <th>№</th>
                        <th>Назва</th>
                        <th>Опис</th>
                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && (localStorage.getItem("role").match("ADMINISTRATOR") || localStorage.getItem("role").match("MANAGER")) ?
                            <th>Дії</th> : <th hidden/>}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        criteria.length === 0 && !isLoading ?
                            <tr align={"center"}>
                                <td colSpan={"11"}>Критерії оцінювання у БД відсутні
                                    {'  '}
                                    <Button size={"sm"} variant={"outline-danger"}
                                            onClick={this.getAllCriteria}><FontAwesomeIcon
                                        icon={faRedo}/></Button>
                                </td>
                            </tr> :
                            isLoading ?
                                <tr align={"center"}>
                                    <td colSpan={"11"}>Завантаження...</td>
                                </tr> :
                                criteria.map((criterion, count) => (
                                    <tr key={criterion.id}>
                                        <td>{count + 1}</td>
                                        <td>{criterion.name}</td>
                                        <td>{criterion.description}</td>
                                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && (localStorage.getItem("role").match("ADMINISTRATOR") || localStorage.getItem("role").match("MANAGER")) ?
                                            <td>
                                                <ButtonGroup>
                                                    <Button className="btn btn-sm btn-outline-warning"
                                                            onClick={this.selectCriterion.bind(this, criterion)}>
                                                        <FontAwesomeIcon icon={faAddressBook}/>
                                                    </Button>{' '}
                                                    <Button size={"sm"} variant={"outline-danger"}
                                                            onClick={this.deleteCriterion.bind(this, criterion.id)}><FontAwesomeIcon
                                                        icon={faTrash}/></Button>{' '}
                                                </ButtonGroup>
                                            </td>
                                            : <td hidden/>}
                                    </tr>
                                ))
                    }

                    </tbody>
                </Table>
            </div>
        );
    }
}



