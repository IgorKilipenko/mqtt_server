import React from 'react';
import { withRouter, Link } from 'react-router-dom';

@withRouter
class App extends React.Component {
    render() {
        return (
            <div>
                <div>MQTT Server</div>
                <div>
                    <Link to={'/signup'}>
                        Регистрация
                    </Link>
                    <Link to={'/signin'}>
                        Вход
                    </Link>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default App;