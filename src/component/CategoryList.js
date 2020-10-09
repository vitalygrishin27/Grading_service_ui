import React, {Component} from "react";
import {Button, Table, ButtonGroup, FormLabel, Form} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {CATEGORIES_MAIN_ENDPOINT, getEndpoint, getOptions} from "./Welcome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faPlusCircle, faTrash, faRedo} from "@fortawesome/free-solid-svg-icons";
import ModalSelectContestContainer from "../container/ModalSelectContestContainer";
import ModalSelectCriteriaContainer from "../container/ModalSelectCriteriaContainer";

export default class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
            isLoading: false,
        };
    }

    getAllCategories = () => {
        this.setState({
            isLoading: true,
        })
        axios.get(getEndpoint(CATEGORIES_MAIN_ENDPOINT), getOptions())
            .then(response => {
                this.setState({
                    error: false,
                    isLoading: false,
                })
                console.log(response.data);
                this.props.changeCategories(response.data);
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
                        message: 'Помилка при завантаженні списку категорій',
                        isLoading: false,
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    componentDidMount() {
        this.getAllCategories();
    }

    changeCategoryIdForChangeCriteria(category) {
        this.props.setSelectedCriteria(category.criteria);
        let originalSelectedCriteriaIds = [];
        category.criteria.forEach(criterion => {
            originalSelectedCriteriaIds.push(criterion.id);
        })
        this.props.setOriginalSelectedCriteriaIds(originalSelectedCriteriaIds);
        this.props.changeCategoryIdForChangeCriteria(category.id);
        this.props.changeCategoryForChangeCriteria(category);
        this.props.changeShowModal(true);
    }

    deleteCategory(categoryId) {
        const conf = window.confirm(`Ви впевнені?`);
        if (conf) {
            this.setState({
                isLoading: true,
            })
            axios.delete(getEndpoint(CATEGORIES_MAIN_ENDPOINT) + "/" + categoryId, getOptions())
                .then(response => {
                    this.setState({
                        show: true,
                        error: false,
                        isLoading: false,
                        message: 'Категорія була видалена'
                    })
                    console.log(response.data);
                    this.getAllCategories();
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
                            message: 'Помилка при видаленні категорії',
                            isLoading: false,
                        });
                    }
                    setTimeout(() => this.setState({"show": false}), 3000);
                });
        }
    }

    selectCategory(category) {
        if (!category.id) {
            category.id = -1;
        }
        this.props.changeCategoryForEdit(category);
        this.props.history.push('/categories/' + category.id);
    }

    render() {
        const {categories} = this.props;
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
                <ModalSelectCriteriaContainer/>
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
                                        onClick={this.selectCategory.bind(this, {})}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>{'  '}
                                    Додати нову категорію
                                </Button>{' '}
                            </ButtonGroup>
                        </td> : <td hidden/>}
                    </tr>
                    <tr>
                        <th>№</th>
                        <th>Назва</th>
                        <th>Опис</th>
                        <th>Критерії</th>
                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && (localStorage.getItem("role").match("ADMINISTRATOR") || localStorage.getItem("role").match("MANAGER")) ?
                            <th>Дії</th> : <th hidden/>}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        categories.length === 0 && !isLoading ?
                            <tr align={"center"}>
                                <td colSpan={"11"}>Категорії у БД відсутні
                                    {'  '}
                                    <Button size={"sm"} variant={"outline-danger"}
                                            onClick={this.getAllCategories}><FontAwesomeIcon
                                        icon={faRedo}/></Button>
                                </td>
                            </tr> :
                            isLoading ?
                                <tr align={"center"}>
                                    <td colSpan={"11"}>Завантаження...</td>
                                </tr> :
                                categories.map((category, count) => (
                                    <tr key={category.id}>
                                        <td>{count + 1}</td>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            {category.criteria.map((criterion, count) => (
                                                <div key={criterion.id}><FormLabel key={count}>
                                                    {criterion.name}
                                                </FormLabel><br/></div>
                                            ))}
                                            {localStorage.getItem("gradingServiceAccessToken")
                                            && localStorage.getItem("role")
                                            && (localStorage.getItem("role").match("ADMINISTRATOR") ||
                                                localStorage.getItem("role").match("MANAGER")) ?
                                                <Button className="btn btn-sm btn-outline-warning"
                                                        onClick={this.changeCategoryIdForChangeCriteria.bind(this, category)}>
                                                    Обрати критерії
                                                </Button> :
                                                ''}
                                        </td>


                                        {localStorage.getItem("gradingServiceAccessToken") && localStorage.getItem("role") && (localStorage.getItem("role").match("ADMINISTRATOR") || localStorage.getItem("role").match("MANAGER")) ?
                                            <td>
                                                <ButtonGroup>
                                                    <Button className="btn btn-sm btn-outline-warning"
                                                            onClick={this.selectCategory.bind(this, category)}>
                                                        <FontAwesomeIcon icon={faAddressBook}/>
                                                    </Button>{' '}
                                                    <Button size={"sm"} variant={"outline-danger"}
                                                            onClick={this.deleteCategory.bind(this, category.id)}><FontAwesomeIcon
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



