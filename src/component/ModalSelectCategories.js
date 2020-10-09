import React, {Component} from "react";
import {Button, Modal, Table} from "react-bootstrap";
import axios from "axios";
import {
    CATEGORIES_MAIN_ENDPOINT, CONTESTS_MAIN_ENDPOINT,
    getEndpoint,
    getOptions,
} from "./Welcome";

export default class ModalSelectCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changed: 0,
            showMessage: false,
            error: false,
            message: '',
            isLoading: false,
        };
    }

    componentDidMount() {
        this.getCategoryList();
    }

    changeCategories(categories) {
        this.props.changeCategories(categories);
    }

    changeCategoriesInList(categoryId) {
        let wasExistsInList = false;
        this.props.selectedCategories.forEach(category => {
            if (category.id === categoryId) {
                this.props.removeCategoryFromList(category);
                wasExistsInList = true;
            }
        })
        if (!wasExistsInList) {
            this.props.categories.forEach(category => {
                if (category.id === categoryId) {
                    this.props.addCategoryToList(category);
                }
            })
        }
        this.rerenderModal();
    }

    getCategoryList = () => {
        axios.get(getEndpoint(CATEGORIES_MAIN_ENDPOINT), getOptions())
            .then(response => {
                console.log(response.data);
                this.changeCategories(response.data);
            })
            .catch((error) => {
                console.error("Error" + error);
                if (error.response && error.response.status === 403) {
                    this.setState({
                        showMessage: true,
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
                        showMessage: true,
                        error: true,
                        message: 'Помилка при завантаженні списку категорій'
                    });
                }
                setTimeout(() => this.setState({"showMessage": false}), 3000);
            });
    }

    handleClose() {
        this.props.changeShowModal(false);
        this.props.changeContestIdForChangeCategories(-1);
        this.props.setSelectedCategories([]);
        this.props.setOriginalSelectedCategoriesIds([]);
    }

    handleCancel() {
        let originalCategories = [];
        this.props.originalSelectedCategoriesIds.forEach(originalCategoryId => {
            this.props.categories.forEach(category => {
                if (category.id === originalCategoryId) {
                    originalCategories.push(category);
                }
            })
        })
        this.props.setSelectedCategories(originalCategories);
        this.handleClose();
    }

    handleSaveAndClose() {
        this.props.contestForChangeCategories.categories = this.props.selectedCategories;
        axios.post(getEndpoint(CONTESTS_MAIN_ENDPOINT), JSON.stringify(this.props.contestForChangeCategories), getOptions())
            .then((res) => {
                this.setState({
                    show: true,
                    error: false,
                    message: 'Список категорій для конкурсу збережено!'
                });
                setTimeout(() => this.setState({"show": false}), 2000);
                this.handleClose();
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
                        message: 'Помилка при збереженні списку категорій для конкурсу'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    rerenderModal() {
        let nextCount = this.state.changed + 1;
        this.setState({
            changed: nextCount,
        })
    }

    render() {
        const {showModal, categories} = this.props;
        return (
            <>
                <Modal show={showModal} onHide={this.handleCancel.bind(this)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Оберіть категорії</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover variant={"dark"}>
                            <tbody>
                            {categories.map((category, count) => (
                                <tr key={count}>
                                    <td>{category.name}</td>
                                    <td><Button
                                        variant={this.props.selectedCategoriesIds.includes(category.id) ? 'danger' : 'warning'}
                                        onClick={this.changeCategoriesInList.bind(this, category.id)}>
                                        {this.props.selectedCategoriesIds.includes(category.id) ? 'Видалити' : 'Додати'}</Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleCancel.bind(this)}>
                            Відмінити редагування
                        </Button>
                        <Button variant="warning" onClick={this.handleSaveAndClose.bind(this)}>
                            Зберегти
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}