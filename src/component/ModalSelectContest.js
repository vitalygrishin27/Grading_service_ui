import React, {Component} from "react";
import {Button, Modal, Form, Table, Image} from "react-bootstrap";
import axios from "axios";
import {getOptions} from "./Welcome";

const createContestToUserType = (props) => {
    return {
        userId: props.userIdForChangeContest,
        contestIds: props.selectedContestIds,
    }
}

export default class ModalSelectContest extends Component {
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
        this.getContestList();
    }

    changeContests(contests) {
        this.props.changeContests(contests);
    }

    changeContestsInList(contestId) {
        let wasExistsInList = false;
        this.props.selectedContests.forEach(contest => {
            if (contest.id === contestId) {
                this.props.removeContestFromList(contest);
                wasExistsInList = true;
            }
        })
        if (!wasExistsInList) {
            this.props.contests.forEach(contest => {
                if (contest.id === contestId) {
                    this.props.addContestToList(contest);
                }
            })
        }
        this.rerenderModal();
    }

    getContestList = () => {
        axios.get(localStorage.getItem("host") + "contest", getOptions())
            .then(response => {
                console.log(response.data);
                this.changeContests(response.data);
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
                        message: 'Помилка при завантаженні списка конкурсів'
                    });
                }
                setTimeout(() => this.setState({"showMessage": false}), 3000);
            });
    }

    handleClose() {
        this.props.changeShowModal(false);
        this.props.changeUserIdForChangeContest(-1);
        this.props.setSelectedContests([]);
        this.props.setOriginalSelectedContestIds([]);
    }

    handleCancel() {
        let originalContests = [];
        this.props.originalSelectedContestIds.forEach(originalContestId => {
            this.props.contests.forEach(contest => {
                if (contest.id === originalContestId) {
                    originalContests.push(contest);
                }
            })
        })
        this.props.setSelectedContests(originalContests);
        this.handleClose();
    }

    handleSaveAndClose() {
        this.props.userForChangeContest.contests = this.props.selectedContests;
        axios.post(localStorage.getItem("host") + "user", JSON.stringify(this.props.userForChangeContest), getOptions())
            .then((res) => {
                this.setState({
                    show: true,
                    error: false,
                    message: 'Список конкурсів для користувача збережено!'
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
                        message: 'Помилка при збереженні списку конкурсів для користувача'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    rerenderModal() {
        this.setState({
            changed: this.state.changed++,
        })
    }

    render() {
        const {showModal, contests} = this.props;
        return (
            <>
                <Modal show={showModal} onHide={this.handleCancel.bind(this)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Оберіть конкурси</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover variant={"dark"}>
                            {contests.map((contest) => (
                                <tr>
                                    <td><Image src={contest.photo} rounded width={"50"} height={"71"}/> {'   '}{contest.name}</td>
                                    <td><Button
                                        variant={this.props.selectedContestIds.includes(contest.id) ? 'danger' : 'warning'}
                                        onClick={this.changeContestsInList.bind(this, contest.id)}>
                                        {this.props.selectedContestIds.includes(contest.id) ? 'Видалити' : 'Додати'}</Button>
                                    </td>
                                </tr>
                            ))}
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