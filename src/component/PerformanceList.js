import React, {Component} from "react";
import {Button, Table, ButtonGroup} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getEndpoint, getOptions, PERFORMANCES_MAIN_ENDPOINT} from "./Welcome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faPlusCircle, faTrash, faRedo} from "@fortawesome/free-solid-svg-icons";

export default class PerformanceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
            isLoading: false,
        };
    }

    getAllPerformances = () => {
        this.setState({
            isLoading: true,
        })
        axios.get(getEndpoint(PERFORMANCES_MAIN_ENDPOINT), getOptions())
            .then(response => {
                this.setState({
                    error: false,
                    isLoading: false,
                })
                console.log(response.data);
                this.props.changePerformances(response.data);
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
                        message: 'Помилка при завантаженні списка конкурсів',
                        isLoading: false,
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    componentDidMount() {
        this.getAllPerformances();
    }

    deletePerformance(performanceId) {
        const conf = window.confirm(`Ви впевнені?`);
        if (conf) {
            this.setState({
                isLoading: true,
            })
            axios.delete(getEndpoint(PERFORMANCES_MAIN_ENDPOINT) + "/" + performanceId, getOptions())
                .then(response => {
                    this.setState({
                        show: true,
                        error: false,
                        isLoading: false,
                        message: 'Конкурсний номер було видалено'
                    })
                    console.log(response.data);
                    this.getAllContests();
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
                            message: 'Помилка при видаленні конкурсу',
                            isLoading: false,
                        });
                    }
                    setTimeout(() => this.setState({"show": false}), 3000);
                });
        }
    }

    selectPerformance(performance) {
        if (!performance.id) {
            performance.id = -1;
        }
        this.props.changePerformanceForEdit(performance);
        this.props.history.push('/performance/' + performance.id);
    }

    render() {
        const {performances} = this.props;
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
                        || localStorage.getItem("role").match("MANAGER")
                        || localStorage.getItem("role").match("PARTICIPANT")) ?
                        <td colSpan={"100"}>
                            <ButtonGroup>
                                <Button className="btn btn-sm btn-outline-warning"
                                        style={{"background": "transparent"}}
                                        onClick={this.selectPerformance.bind(this, {})}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>{'  '}
                                    Додати конкурсний номер
                                </Button>{' '}
                            </ButtonGroup>
                        </td> : <td hidden/>}
                    </tr>
                    <tr>
                        <th>№</th>
                        {localStorage.getItem("gradingServiceAccessToken")
                        && localStorage.getItem("role")
                        && (!localStorage.getItem("role").match("PARTICIPANT")) ?
                            <th>Учасник</th> : ''}
                        <th>Назва</th>
                        <th>Опис</th>
                        <th>Конкурс</th>
                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ?
                            <th>Дії</th> : <th hidden/>}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        performances.length === 0 && !isLoading ?
                            <tr align={"center"}>
                                <td colSpan={"11"}>Конкурсні номери у БД відсутні
                                    {'  '}
                                    <Button size={"sm"} variant={"outline-danger"}
                                            onClick={this.getAllPerformances}><FontAwesomeIcon
                                        icon={faRedo}/></Button>
                                </td>
                            </tr> :
                            isLoading ?
                                <tr align={"center"}>
                                    <td colSpan={"11"}>Завантаження...</td>
                                </tr> :
                                performances.map((performance, count) => (
                                    <tr key={performance.id}>
                                        <td>{count + 1}</td>
                                        {localStorage.getItem("gradingServiceAccessToken")
                                        && localStorage.getItem("role")
                                        && (!localStorage.getItem("role").match("PARTICIPANT")) ?
                                            <td>{performance.user.lastName + ' ' + performance.user.firstName + ' ' + performance.user.secondName}</td> : ''}
                                        <td>{performance.name}</td>
                                        <td>{performance.description}</td>
                                        <td>{performance.contest ? performance.contest.name : ''}</td>
                                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ?
                                            <td>
                                                <ButtonGroup>
                                                    <Button className="btn btn-sm btn-outline-warning"
                                                            onClick={this.selectPerformance.bind(this, performance)}>
                                                        <FontAwesomeIcon icon={faAddressBook}/>
                                                    </Button>{' '}
                                                    <Button size={"sm"} variant={"outline-danger"}
                                                            onClick={this.deletePerformance.bind(this, performance.id)}><FontAwesomeIcon
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



