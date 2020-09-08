import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Welcome from "./component/Welcome";
import Footer from "./component/Footer";
import NavigationBar from "./component/NavigationBar";

import {Provider} from "react-redux";
import {createStore} from "redux";
import Configuration from "./component/form/Configuration";
import {rootReducer} from "./component/store/reducers";
import Logging from "./component/form/Logging";

export const ACTION_CHANGE_CONTEST_NAME = 'ACTION_CHANGE_CONTEST_NAME';
export const ACTION_CHANGE_LOGIN = 'ACTION_CHANGE_LOGIN';
export const ACTION_CHANGE_PASSWORD = 'ACTION_CHANGE_PASSWORD';

export const store = createStore(rootReducer);

export default function App() {
    const marginTop = {
        marginTop: "20px"
    };
    return (
        <Provider store={store}>
            <Router>
                <NavigationBar/>
                <Container>
                    <Row>
                        <Col lg={12} style={marginTop}>
                            <Switch>
                                <Route path={"/"} exact component={Welcome}/>
                                <Route path={"/settings"} exact component={Configuration}/>
                                <Route path={"/login"} exact component={Logging}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </Router>
        </Provider>
    );
}
