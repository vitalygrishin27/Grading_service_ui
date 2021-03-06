import React, {Component} from "react";
import {Button, Table, Image, ButtonGroup, FormLabel} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {CONTESTS_MAIN_ENDPOINT, getEndpoint, getOptions} from "./Welcome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faPlusCircle, faTrash, faRedo} from "@fortawesome/free-solid-svg-icons";
import ModalSelectCriteriaContainer from "../container/ModalSelectCriteriaContainer";
import ModalSelectCategoriesContainer from "../container/ModalSelectCategoriesContainer";

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
        axios.get(getEndpoint(CONTESTS_MAIN_ENDPOINT), getOptions())
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
        this.getAllContests();
    }

    deleteContest(contestId) {
        const conf = window.confirm(`Ви впевнені?`);
        if (conf) {
            this.setState({
                isLoading: true,
            })
            axios.delete(getEndpoint(CONTESTS_MAIN_ENDPOINT) + "/" + contestId, getOptions())
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
    }

    changeContestIdForChangeCategories(contest) {
        this.props.setSelectedCategories(contest.categories);
        let originalSelectedCategoriesIds = [];
        contest.categories.forEach(category => {
            originalSelectedCategoriesIds.push(category.id);
        })
        this.props.setOriginalSelectedCategoriesIds(originalSelectedCategoriesIds);
        this.props.changeContestIdForChangeCategories(contest.id);
        this.props.changeContestForChangeCategories(contest);
        this.props.changeShowModal(true);
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
                <ModalSelectCategoriesContainer/>
                <Table striped bordered hover variant={"dark"} style={{"width": "50%", 'display': 'table'}}>
                    <thead>
                    <tr>{localStorage.getItem("gradingServiceAccessToken")
                    && localStorage.getItem("role")
                    && (localStorage.getItem("role").match("ADMINISTRATOR")
                        || localStorage.getItem("role").match("MANAGER")) ?
                        <td colSpan={localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ? "5" : "4"}>
                            <ButtonGroup>
                                <Button className="btn btn-sm btn-outline-warning"
                                        style={{"background": "transparent"}}
                                        onClick={this.selectContest.bind(this, -1)}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>{'  '}
                                    Додати конкурс
                                </Button>{' '}
                            </ButtonGroup>
                        </td> : <td hidden/>}
                    </tr>
                    <tr>
                        <th>№</th>
                        <th>Фото</th>
                        <th>Назва</th>
                        <th>Деталі</th>
                        <th>Категорії</th>
                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ?
                            <th>Дії</th> : <th hidden/>}
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
                                        <td>{contest.description}</td>
                                        <td>
                                            {contest.categories.map((category, count) => (
                                                <FormLabel key={count}>
                                                    {category.name}
                                                </FormLabel>
                                            ))}
                                            {localStorage.getItem("gradingServiceAccessToken")
                                            && localStorage.getItem("role")
                                            && (localStorage.getItem("role").match("ADMINISTRATOR") ||
                                                localStorage.getItem("role").match("MANAGER")) ?
                                                <Button className="btn btn-sm btn-outline-warning"
                                                        onClick={this.changeContestIdForChangeCategories.bind(this, contest)}>
                                                    Обрати категорії
                                                </Button> :
                                                ''}
                                        </td>



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



