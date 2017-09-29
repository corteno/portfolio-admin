import React, {Component} from 'react';
import AuthServices from '../utils/AuthServices';
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
                this.setState({username: e.target.value});
                break;
            case 'password':
                this.setState({password: e.target.value});
                break;
            default:
                break;
        }

    };
    
    onSubmit = (e) => {
        e.preventDefault();
        AuthServices.login({username: this.state.username, password: this.state.password}).then();
    };

    render() {
        return (
            <div className='login-wrapper'>
                <h1 className="login-title">BD</h1>
                <form action="" className="login-form" onSubmit={this.onSubmit}>
                    <Input
                        type='text'
                        className='form-username'
                        name='username'
                        onInputChange={this.onInputChange}
                        value={this.state.username}
                        label='Username'
                    />
                    <Input
                        type='password'
                        className='form-password'
                        name='password'
                        value={this.state.password}
                        onInputChange={this.onInputChange}
                        label='Password'
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