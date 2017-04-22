import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Resource } from 'admin-on-rest';
// import createLoopbackRestClient from 'aor-loopback';

import MovieIcon from 'material-ui/svg-icons/image/collections';
import RecommendationIcon from 'material-ui/svg-icons/communication/comment';

import './App.css';

import authClient from './authClient';
import sagas from './sagas';
import themeReducer from './themeReducer';
import Login from './Login';
import Layout from './Layout';
import Menu from './Menu';
import CustomRoutes from './routes';
import translations from './i18n';

import { MoviesList, RecommendationsList } from './movies';

import createRestClient from './modules/restClient';

// import restClient from './restClient';
// import fakeRestServer from './restServer';

const restClient = createRestClient(localStorage.getItem('apiUrl') || 'http://localhost:3333/api');

class App extends Component {
    // componentWillMount() {
    //     this.restoreFetch = fakeRestServer();
    // }

    // componentWillUnmount() {
    //     this.restoreFetch();
    // }

    render() {
        return (
            <Admin
                title="Reccomender AAS"
                restClient={restClient}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                customRoutes={CustomRoutes}
                authClient={authClient}
                dashboard={null}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                messages={translations}
            >
                <Resource name="movies" list={MoviesList} icon={MovieIcon} />
                <Resource name="recommendations" list={RecommendationsList} icon={RecommendationIcon} />
            </Admin>
        );
    }
}

export default App;
