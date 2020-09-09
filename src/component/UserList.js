import React, {Component} from "react";
import {Button, Table, Image, ButtonGroup} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getOptions} from "./Welcome";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";

export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /*     users: [],*/
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

    getAllUsers = () => {
        this.setState({
            isLoading: true,
        })
        axios.get(localStorage.getItem("host") + "user", getOptions())
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
                console.log(error.response.status);
                if (error.response.status === 403) {
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
                        message: 'Помилка при завантаженні списка користувачів',
                        isLoading: false,
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    };

    componentDidMount() {
        this.getAllUsers();
    }

    deleteUser() {

    }

    selectUser(userId) {
        this.changeUserIdForEdit(userId);
        this.props.history.push('/user/'+userId);
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
                <Table striped bordered hover variant={"dark"} style={{"width": "50%", 'display': 'table'}}>
                    <thead>
                    <tr>
                        <td colSpan={localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ? "8" : "7"}>
                            <ButtonGroup>
                                <Button className="btn btn-sm btn-outline-warning" style={{"background":"transparent"}}
                                      //to={"/user/-1"}
                                        onClick={this.selectUser.bind(this, -1)}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>{'  '}
                                    Додати користувача
                                </Button>{' '}
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <th>№</th>
                        <th>Фото</th>
                        <th>Логін</th>
                        <th>Пароль</th>
                        <th>ПIБ</th>
                        <th>Посада</th>
                        <th>Рівень доступу</th>
                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ?
                            <th>Дії</th> : ""}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.length === 0 && !isLoading ?
                            <tr align={"center"}>
                                <td colSpan={"11"}>Користувачі у БД відсутні</td>
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
                                        <td>{user.role}</td>
                                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR") ?
                                            <td>
                                                <ButtonGroup>
                                                    <Button className="btn btn-sm btn-outline-warning"
                                                        // to={"/user/" + user.id}
                                                            onClick={this.selectUser.bind(this, user.id)}>
                                                        <FontAwesomeIcon icon={faAddressBook}/>
                                                    </Button>{' '}
                                                    <Button size={"sm"} variant={"outline-danger"}
                                                            onClick={this.deleteUser.bind(this, user.id)}><FontAwesomeIcon
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



