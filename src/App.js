import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Welcome from "./component/Welcome";
import Footer from "./component/Footer";

import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./component/store/reducers";
import ConfigurationContainer from "./container/ConfigurationContainer";
import LoggingContainer from "./container/LoggingContainer";
import thunk from 'redux-thunk';
import NavigationBarContainer from "./container/NavigationBarContainer";
import UserListContainer from "./container/UserListContainer";
import UserContainer from "./container/UserContainer";
import ContestListContainer from "./container/ContestListContainer";
import ContestContainer from "./container/ContestContainer";

const store = configureStore();

export default function App() {
    const marginTop = {
        marginTop: "20px"
    };
    return (
        <Provider store={store}>
            <Router>
                <NavigationBarContainer/>
                <Container>
                    <Row>
                        <Col lg={12} style={marginTop}>
                            <Switch>
                                <Route path={"/"} exact component={Welcome}/>
                                <Route path={"/settings"} exact component={ConfigurationContainer}/>
                                <Route path={"/login"} exact component={LoggingContainer}/>
                                <Route path={"/users"} exact component={UserListContainer}/>
                                <Route path={"/user/:id"} exact component={UserContainer}/>
                                <Route path={"/contests"} exact component={ContestListContainer}/>
                                <Route path={"/contest/:id"} exact component={ContestContainer}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </Router>
        </Provider>
    );
}

function configureStore(initialState){
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}