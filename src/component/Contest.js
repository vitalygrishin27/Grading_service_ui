import React, {Component} from "react";
import {Form, Button, Col, Image} from "react-bootstrap";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {getOptions} from "./Welcome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const createContestType = (props) => {
    return {
        id: props.contestIdForEdit,
        name: props.name,
        photo: props.photo,
    }
}

export default class Contest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: false,
            message: '',
        };
        this.changeName = this.changeName.bind(this);
        this.changePhoto = this.changePhoto.bind(this);
        this.changeContestIdForEdit = this.changeContestIdForEdit.bind(this);
    }

    changeName(event) {
        this.props.changeName(event.target.value);
    }

    changePhoto(event) {
        this.props.changePhoto(event.target.value);
    }

    changeContestIdForEdit(contestIdForEdit) {
        this.props.changeContestIdForEdit(contestIdForEdit);
    }

    fileChose = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);

            this.props.changePhoto(reader.result);
        }
        return URL.createObjectURL(event.target.files[0]);

    };

    clearPhoto() {
        this.props.changePhoto('');
        document.getElementById('inputPhoto').value = '';
    }

    saveContest = event => {
        event.preventDefault();
        let contest = createContestType(this.props);
        axios.post(localStorage.getItem("host") + "contest", JSON.stringify(contest), getOptions())
            .then((res) => {
                this.setState({
                    show: true,
                    error: false,
                    message: 'Дані конкурсу збережено!'
                });
                this.props.changeName(null);
                this.props.changePhoto(null);
                this.props.changeContestIdForEdit(-1);
                setTimeout(() => this.setState({"show": false}), 3000);
                setTimeout(() => this.props.history.push('/contests'), 3000);
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
                    setTimeout(() => this.props.history.push('/login'), 3000);
                } else {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Помилка при збереженні даних конкурсу'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }

    componentDidMount() {
        const contestIdForEdit = this.props.contestIdForEdit;
        if (contestIdForEdit !== -1) {
            this.findContestById(contestIdForEdit);
        }
    }

    findContestById = (contestId) => {
        axios.get(localStorage.getItem("host") + "contest/" + contestId, getOptions())
            .then(response => {
                this.props.changeName(response.data.name);
                this.props.changePhoto(response.data.photo);
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
                    setTimeout(() => this.props.history.push('/login'), 3000);
                } else {
                    this.setState({
                        show: true,
                        error: true,
                        message: 'Помилка при завантаженні даних конкурсу'
                    });
                }
                setTimeout(() => this.setState({"show": false}), 3000);
            });
    }


    render() {
        const {
            name,
            photo,
        } = this.props;
        const {show, error, message} = this.state;
        return (
            <div>
                <div style={{"display": show ? "block" : "none"}}>
                    <ToastMessage
                        show={show}
                        error={error}
                        message={message}
                    />
                </div>
                <Form className={"text-white text-muted"} onSubmit={this.saveContest}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2}>Назва</Form.Label>
                            <Form.Control
                                type="text"
                                className="mx-sm-3"
                                value={name}
                                onChange={this.changeName}
                                id="inputName"
                                aria-describedby="inputNameHelpInline"
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label column lg={2} htmlFor="inputPhoto">Фото</Form.Label>
                            <Form.Control
                                type="file"
                                className="mx-sm-3"
                                //value={photo}
                                onChange={this.fileChose}
                                id="inputPhoto"
                                aria-describedby="inputPhotoHelpInline"
                            />
                        </Form.Group>

                        <Image style={{"display": this.props.photo ? "inline-block" : "none"}}
                               src={this.props.photo} rounded width={"50"}
                               height={"71"}/> &nbsp;&nbsp;
                        <Button size={"sm"}
                                variant={"outline-danger"}
                                style={{"display": this.props.photo ? "inline-block" : "none", "height": "30px"}}
                                onClick={this.clearPhoto.bind(this)}
                        >
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button type="submit">Зберегти</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}



