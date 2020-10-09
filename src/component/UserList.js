import React, {Component} from "react";
import {Button, Table, Image, ButtonGroup, FormLabel} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getEndpoint, getOptions, USERS_MAIN_ENDPOINT} from "./Welcome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faPlusCircle, faTrash, faRedo} from "@fortawesome/free-solid-svg-icons";
import ModalSelectContestContainer from "../container/ModalSelectContestContainer";

export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
            isLoading: false,
        };
    }

    changeUsers(users) {
        this.props.changeUsers(users);
    }

    changeUserIdForEdit(userId) {
        this.props.changeUserIdForEdit(userId);
    }

    changeUserForEdit(user) {
        this.props.changeUserForEdit(user);
    }

    changeUserIdForChangeContest(user) {
        this.props.setSelectedContests(user.contests);
        let originalSelectedContestIds = [];
        user.contests.forEach(contest => {
            originalSelectedContestIds.push(contest.id);
        })
        this.props.setOriginalSelectedContestIds(originalSelectedContestIds);
        this.props.changeUserIdForChangeContest(user.id);
        this.props.changeUserForChangeContest(user);
        this.props.changeShowModal(true);
    }

    getAllUsers = () => {
        this.setState({
            isLoading: true,
        })
        axios.get(getEndpoint(USERS_MAIN_ENDPOINT), getOptions())
            .then(response => {
                this.setState({
                    error: false,
                    isLoading: false,
                })
                console.log(response.data);
                this.changeUsers(response.data);
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
                        message: 'Помилка при завантаженні списка користувачів',
                        isLoading: false,
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    componentDidMount() {
        this.getAllUsers();
    }

    deleteUser(userId) {
        const conf = window.confirm(`Ви впевнені?`);
        if (conf) {
            this.setState({
                isLoading: true,
            })
            axios.delete(getEndpoint(USERS_MAIN_ENDPOINT) + "/" + userId, getOptions())
                .then(response => {
                    this.setState({
                        show: true,
                        error: false,
                        isLoading: false,
                        message: 'Користувача було видалено'
                    })
                    console.log(response.data);
                    this.getAllUsers();
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
                            message: 'Помилка при видаленні користувача',
                            isLoading: false,
                        });
                    }
                    setTimeout(() => this.setState({"show": false}), 3000);
                });
        }
    }

    selectUser(user) {
        this.changeUserIdForEdit(user.id);
        this.changeUserForEdit(user);
        this.props.history.push('/user/' + user.id);
    }

    createNewUser() {
        this.changeUserIdForEdit(-1);
        this.changeUserForEdit({});
        this.props.history.push('/user/-1');
    }

    render() {
        const {users} = this.props;
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
                <ModalSelectContestContainer/>
                <Table striped bordered hover variant={"dark"} style={{"width": "50%", 'display': 'table'}}>
                    <thead>
                    <tr>
                        {localStorage.getItem("gradingServiceAccessToken")
                        && localStorage.getItem("role")
                        && (localStorage.getItem("role").match("ADMINISTRATOR")
                            || localStorage.getItem("role").match("MANAGER")) ?
                            <td colSpan={localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ? "9" : "8"}>
                                <ButtonGroup>
                                    <Button className="btn btn-sm btn-outline-warning"
                                            style={{"background": "transparent"}}
                                        //to={"/user/-1"}
                                            onClick={this.createNewUser.bind(this)}>
                                        <FontAwesomeIcon icon={faPlusCircle}/>{'  '}
                                        Додати користувача
                                    </Button>{' '}
                                </ButtonGroup>
                            </td> : <td hidden/>}
                    </tr>

                    {localStorage.getItem("gradingServiceAccessToken")
                    && localStorage.getItem("role")
                    && (localStorage.getItem("role").match("PARTICIPANT")) ?
                        <tr>
                            <th>№</th>
                            <th>Фото</th>
                            <th>Логін</th>
                            <th>Пароль</th>
                            <th>ПIБ</th>
                            <th>Заклад</th>
                            <th>Конкурси</th>
                            <th>Дії</th>
                        </tr>
                        :
                        <tr>
                            <th>№</th>
                            <th>Фото</th>
                            <th>Логін</th>
                            <th>Пароль</th>
                            <th>ПIБ</th>
                            <th>Посада (Заклад)</th>
                            <th>Конкурси</th>
                            <th>Рівень доступу</th>
                            <th>Дії</th>
                        </tr>
                    }
                    </thead>
                    <tbody>
                    {
                        users.length === 0 && !isLoading ?
                            <tr align={"center"}>
                                <td colSpan={"11"}>Користувачі у БД відсутні
                                    {'  '}
                                    <Button size={"sm"} variant={"outline-danger"}
                                            onClick={this.getAllUsers}><FontAwesomeIcon
                                        icon={faRedo}/></Button>
                                </td>
                            </tr> :
                            isLoading ?
                                <tr align={"center"}>
                                    <td colSpan={"11"}>Завантаження...</td>
                                </tr> :
                                users.map((user, count) => (
                                    <tr key={user.id}>
                                        <td>{count + 1}</td>
                                        <td><Image src={user.photo} rounded width={"50"} height={"71"}/>
                                        </td>
                                        <td>{user.login}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            {user.lastName}
                                            {' '}{user.firstName}
                                            {' '}{user.secondName}</td>
                                        <td>{user.position}</td>
                                        <td>
                                            {user.contests.map((contest, count) => (
                                                <FormLabel key={count}>
                                                    <Image src={contest.photo} rounded width={"50"}
                                                           height={"71"}/>{'  '}{contest.name}
                                                </FormLabel>
                                            ))}
                                            {localStorage.getItem("gradingServiceAccessToken")
                                            && localStorage.getItem("role")
                                            && (!localStorage.getItem("role").match("PARTICIPANT")) ?
                                                <Button className="btn btn-sm btn-outline-warning"
                                                        onClick={this.changeUserIdForChangeContest.bind(this, user)}>
                                                    Обрати конкурси
                                                </Button> :
                                                ''}
                                        </td>
                                        {localStorage.getItem("gradingServiceAccessToken")
                                        && localStorage.getItem("role")
                                        && (localStorage.getItem("role").match("PARTICIPANT")) ?
                                            <td/> : <td>{user.role}</td>}
                                        <td>
                                            <ButtonGroup>
                                                <Button className="btn btn-sm btn-outline-warning"
                                                    // to={"/user/" + user.id}
                                                        onClick={this.selectUser.bind(this, user)}>
                                                    <FontAwesomeIcon icon={faAddressBook}/>
                                                </Button>{' '}
                                                <Button size={"sm"} variant={"outline-danger"}
                                                        onClick={this.deleteUser.bind(this, user.id)}><FontAwesomeIcon
                                                    icon={faTrash}/></Button>{' '}
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                    }

                    </tbody>
                </Table>
            </div>
        );
    }
}



