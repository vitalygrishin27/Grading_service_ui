import React, {Component} from "react";
import {Button, Table, Image, ButtonGroup} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getOptions} from "./Welcome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faPlusCircle, faTrash, faRedo} from "@fortawesome/free-solid-svg-icons";

export default class ContestList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
            isLoading: false,
        };
    }

    changeContests(contests) {
        this.props.changeContests(contests);
    }

    changeContestIdForEdit(contestId) {
        this.props.changeContestIdForEdit(contestId);
    }

    getAllContests = () => {
        this.setState({
            isLoading: true,
        })
        axios.get(localStorage.getItem("host") + "contest", getOptions())
            .then(response => {
                this.setState({
                    error: false,
                    isLoading: false,
                })
                console.log(response.data);
                this.changeContests(response.data);
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
                    setTimeout(() => this.props.history.push('/login'), 3000);
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
        this.getAllContests();
    }

    deleteContest(contestId) {
        const conf = window.confirm(`Ви впевнені?`);
        if (conf) {
            this.setState({
                isLoading: true,
            })
            axios.delete(localStorage.getItem("host") + "contest/" + contestId, getOptions())
                .then(response => {
                    this.setState({
                        show: true,
                        error: false,
                        isLoading: false,
                        message: 'Конкурс було видалено'
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
                        setTimeout(() => this.props.history.push('/login'), 3000);
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
    }

    selectContest(contestId) {
        this.changeContestIdForEdit(contestId);
        this.props.history.push('/contest/' + contestId);
    }

    render() {
        const {contests} = this.props;
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
                    <tr>
                        <td colSpan={localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ? "5" : "4"}>
                            <ButtonGroup>
                                <Button className="btn btn-sm btn-outline-warning" style={{"background": "transparent"}}
                                        onClick={this.selectContest.bind(this, -1)}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>{'  '}
                                    Додати конкурс
                                </Button>{' '}
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <th>№</th>
                        <th>Фото</th>
                        <th>Назва</th>
                        <th>Учасники</th>
                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ?
                            <th>Дії</th> : ""}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contests.length === 0 && !isLoading ?
                            <tr align={"center"}>
                                <td colSpan={"11"}>Конкурси у БД відсутні
                                    {'  '}
                                    <Button size={"sm"} variant={"outline-danger"}
                                            onClick={this.getAllContests}><FontAwesomeIcon
                                        icon={faRedo}/></Button>
                                </td>
                            </tr> :
                            isLoading ?
                                <tr align={"center"}>
                                    <td colSpan={"11"}>Завантаження...</td>
                                </tr> :
                                contests.map((contest, count) => (
                                    <tr key={contest.id}>
                                        <td>{count + 1}</td>
                                        <td><Image src={contest.photo} rounded width={"50"} height={"71"}/>
                                        </td>
                                        <td>{contest.name}</td>
                                        <td>{contest.name}</td>
                                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ?
                                            <td>
                                                <ButtonGroup>
                                                    <Button className="btn btn-sm btn-outline-warning"
                                                            onClick={this.selectContest.bind(this, contest.id)}>
                                                        <FontAwesomeIcon icon={faAddressBook}/>
                                                    </Button>{' '}
                                                    <Button size={"sm"} variant={"outline-danger"}
                                                            onClick={this.deleteContest.bind(this, contest.id)}><FontAwesomeIcon
                                                        icon={faTrash}/></Button>{' '}
                                                </ButtonGroup>
                                            </td>
                                            : ""}
                                    </tr>
                                ))
                    }

                    </tbody>
                </Table>
            </div>
        );
    }
}



