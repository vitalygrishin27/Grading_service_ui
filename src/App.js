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
import PerformanceListContainer from "./container/PerformanceListContainer";
import PerformanceContainer from "./container/PerformanceContainer";
import CriterionListContainer from "./container/CriterionListContainer";
import CriterionContainer from "./container/CriterionContainer";
import CategoryListContainer from "./container/CategoryListContainer";
import CategoryContainer from "./container/CategoryContainer";

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
                                <Route path={"/performances"} exact component={PerformanceListContainer}/>
                                <Route path={"/performance/:id"} exact component={PerformanceContainer}/>
                                <Route path={"/criteria"} exact component={CriterionListContainer}/>
                                <Route path={"/criteria/:id"} exact component={CriterionContainer}/>
                                <Route path={"/categories"} exact component={CategoryListContainer}/>
                                <Route path={"/categories/:id"} exact component={CategoryContainer}/>
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