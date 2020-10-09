import React, {Component} from "react";
import {Button, Modal, Table} from "react-bootstrap";
import axios from "axios";
import {
    CATEGORIES_MAIN_ENDPOINT,
    CRITERIA_MAIN_ENDPOINT,
    getEndpoint,
    getOptions,
} from "./Welcome";

export default class ModalSelectCriteria extends Component {
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
        this.getCriterionList();
    }

    changeCriteria(criteria) {
        this.props.changeCriteria(criteria);
    }

    changeCriteriaInList(criterionId) {
        let wasExistsInList = false;
        this.props.selectedCriteria.forEach(criterion => {
            if (criterion.id === criterionId) {
                this.props.removeCriterionFromList(criterion);
                wasExistsInList = true;
            }
        })
        if (!wasExistsInList) {
            this.props.criteria.forEach(criterion => {
                if (criterion.id === criterionId) {
                    this.props.addCriterionToList(criterion);
                }
            })
        }
        this.rerenderModal();
    }

    getCriterionList = () => {
        axios.get(getEndpoint(CRITERIA_MAIN_ENDPOINT), getOptions())
            .then(response => {
                console.log(response.data);
                this.changeCriteria(response.data);
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
                        message: 'Помилка при завантаженні списку критеріїв'
                    });
                }
                setTimeout(() => this.setState({"showMessage": false}), 3000);
            });
    }

    handleClose() {
        this.props.changeShowModal(false);
        this.props.changeCategoryIdForChangeCriteria(-1);
        this.props.setSelectedCriteria([]);
        this.props.setOriginalSelectedCriteriaIds([]);
    }

    handleCancel() {
        let originalCriteria = [];
        this.props.originalSelectedCriteriaIds.forEach(originalCriterionId => {
            this.props.criteria.forEach(criteria => {
                if (criteria.id === originalCriterionId) {
                    originalCriteria.push(criteria);
                }
            })
        })
        this.props.setSelectedCriteria(originalCriteria);
        this.handleClose();
    }

    handleSaveAndClose() {
        this.props.categoryForChangeCriteria.criteria = this.props.selectedCriteria;
        axios.post(getEndpoint(CATEGORIES_MAIN_ENDPOINT), JSON.stringify(this.props.categoryForChangeCriteria), getOptions())
            .then((res) => {
                this.setState({
                    show: true,
                    error: false,
                    message: 'Список критеріїв для категорії збережено!'
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
                        message: 'Помилка при збереженні списку критеріїв для категорії'
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
        const {showModal, criteria} = this.props;
        return (
            <>
                <Modal show={showModal} onHide={this.handleCancel.bind(this)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Оберіть критерії</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover variant={"dark"}>
                            <tbody>
                            {criteria.map((criterion, count) => (
                                <tr key={count}>
                                    <td>{criterion.name}</td>
                                    <td><Button
                                        variant={this.props.selectedCriteriaIds.includes(criterion.id) ? 'danger' : 'warning'}
                                        onClick={this.changeCriteriaInList.bind(this, criterion.id)}>
                                        {this.props.selectedCriteriaIds.includes(criterion.id) ? 'Видалити' : 'Додати'}</Button>
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