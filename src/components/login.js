import React, {Component} from 'react';
import './login.css';

import Input from './form_input';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    onInputChange = (e) => {
        switch (e.target.name) {
            case 'username':
                this.setState({username: e.target.value}, console.log(this.state.username));
                break;
            case 'password':
                this.setState({password: e.target.value});
                break;
            default:
                break;
        }

    };

    render() {
        return (
            <div className='login-wrapper'>
                <h1 className="login-title">Login</h1>
                <form action="" className="login-form">
                    <Input
                        type='text'
                        className='form-username'
                        name='username'
                        onInputChange={this.onInputChange}
                        value={this.state.username}
                    />
                    <Input
                        type='password'
                        className='form-password'
                        name='password'
                        value={this.state.password}
                        onInputChange={this.onInputChange}
                    />
                    <Input
                        type='submit'
                        name='submit'
                        className='form-submit'
                        value='Login'
                    />
                </form>
            </div>
        );
    }
}

export default Login;