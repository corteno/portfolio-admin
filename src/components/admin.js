import React, {Component} from 'react';
import axios from 'axios';
import shortid from 'shortid';

import RootApiUrl from '../utils/RootApiUrl';

import './admin.css';
import AuthServices from "../utils/AuthServices";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuItems: ['Home', 'Contacts'],
            activeMenu: 'Contacts',
            isMenuOpen: false,
            contacts: [],
            notification: {
                active: false,
                message: ''
            }
        }
    }

    componentWillMount() {
        this.getContacts();
    }

    getContacts = () => {
        axios.get(`${RootApiUrl}/contacts`)
            .then((res) => {
                this.setState({contacts: res.data});
            });
    };

    toggleMenu = () => {
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    };

    onMenuClick = (name) => {
        if (this.state.activeMenu !== name) {
            this.setState({activeMenu: name});
        }
    };

    copyEmail = (e) => {
        let range = document.createRange();
        range.selectNodeContents(e.target);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');
        selection.empty();

        this.setNotification('Email copied to clipboard!');

    };

    setNotification = (message) => {
        this.setState({
            notification: {
                active: true,
                message: message
            }
        });

        setTimeout(() => {
            this.setState({
                notification: {
                    active: false,
                    message: message
                }
            });
        }, 3000)
    };

    renderMenuItems = () => {
        return this.state.menuItems.map((item) => {
            return (
                <li className={this.state.activeMenu === item ? "menu-list-item menu-list-active" : "menu-list-item"}
                    key={item}
                    onClick={() => {
                        this.onMenuClick(item);
                        this.toggleMenu()
                    }}
                >
                    {item}
                </li>
            );
        })
    };

    renderContacts = () => {
        if (this.state.contacts.length > 0) {
            return this.state.contacts.map((contact) => {
                return (
                    <li className="contact-list-item col" key={shortid.generate()}>
                        <p className="contact-name">{contact.name}</p>
                        <p className="contact-email" onClick={(event) => this.copyEmail(event)}>{contact.email}</p>
                        <p className="contact-message">{contact.message}</p>
                    </li>
                );
            })
        }
    };

    render() {
        return (
            <div className='admin-wrapper col'>
                <header className='admin-header'>
                    <div className="hamburger" onClick={this.toggleMenu}></div>
                    <div className="logout" onClick={AuthServices.logout}></div>
                </header>
                <nav className={this.state.isMenuOpen ? "menu-wrapper col menu-active" : "menu-wrapper col"}>
                    <h2 className="menu-title">Dashboard</h2>
                    <ul className="menu-list col">
                        {this.renderMenuItems()}
                    </ul>
                    <div className="menu-background" onClick={this.toggleMenu}></div>
                </nav>
                <section className="dashboard-content-wrapper col">
                    {this.state.activeMenu === 'Home'
                        ? <h3 className="dashboard-title">Hello there!</h3>
                        : <div className="contacts-wrapper">
                            <ul className="contacts-list col">
                                {this.renderContacts()}
                            </ul>
                        </div>

                    }

                </section>
                {
                    this.state.notification.active
                        ?
                        <div className="notification-wrapper">
                            <p className="notification-message">{this.state.notification.message}</p>
                        </div>
                        : ''
                }
            </div>
        );
    }
}

export default Admin;