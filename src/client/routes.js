import React from 'react';
import {Route} from 'react-router-dom';
import {SignUp} from './components/SignUp';
import SignInPage from './components/SignIn';
import HomePage from './components/Home'

const SIGN_UP = '/signup';
const SIGN_IN = '/signin';
const LANDING = '/';
const HOME = '/home';
const ACCOUNT = '/account';
const PASSWORD_FORGET = '/pw-forget';


const routes = [
    {
        name: 'SIGN_UP',
        path: '/signup',
        component: SignUp
    },
    {
        name: 'SIGN_IN',
        path: '/signin',
        component: SignInPage
    },
    {
        name: 'INDEX',
        path: '/',
        exact: true,
        component: HomePage
    }
]

const Router = (props) => {
    return (
            routes.map((route,i) => (
                <Route key={i} exact={route.exact} path={route.path} render={props => props.match && <route.component {...props} route={route} routes={route.routes}/>} />
            ))
    )
}

export { Router };