import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Router as AppRouter } from './routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { defaultTheme as theme } from './themes';
import { Provider } from 'mobx-react';

import App from './components/App'

const stores = {
};

ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <App>
                    <Switch>
                        <AppRouter />
                    </Switch>
                </App>
            </MuiThemeProvider>
        </Router>
    </Provider>
    , document.getElementById('app')
)