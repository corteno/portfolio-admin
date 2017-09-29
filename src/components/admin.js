import React, {Component} from 'react';
import axios from 'axios';
import shortid from 'shortid';

import RootApiUrl from '../utils/RootApiUrl';

import './admin.css';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuItems: ['Home', 'Contacts'],
            activeMenu: 'Contacts',
            isMenuOpen: false,
            contacts: []
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

    renderMenuItems = () => {
        return this.state.menuItems.map((item) => {
            return (
                <li className={this.state.activeMenu === item ? "menu-list-item menu-list-active" : "menu-list-item"}
                    key={item}
                    onClick={() => {this.onMenuClick(item); this.toggleMenu()}}
                >
                    {item}
                </li>
            );
        })
    };

    renderContacts = () => {
        if(this.state.contacts.length > 0){
            return this.state.contacts.map((contact) => {
                return (
                    <li className="contact-list-item col" key={shortid.generate()}>
                        <p className="contact-name">{contact.name}</p>
                        <div>
                            <p className="contact-email">{contact.email}-</p>
                            <p className="contact-message">{contact.message}</p>
                        </div>
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
                </header>
                <nav className={this.state.isMenuOpen ? "menu-wrapper col menu-active" : "menu-wrapper col"}>
                    <h2 className="menu-title">Dashboard</h2>
                    <ul className="menu-list col">
                        {this.renderMenuItems()}
                    </ul>
                    <div className="menu-background" onClick={this.toggleMenu}></div>
                </nav>
                <section className="dashboard-content-wrapper col">
                    { this.state.activeMenu === 'Home'
                        ? <h3 className="dashboard-title">Hello there!</h3>
                        : <div className="contacts-wrapper">
                            <ul className="contacts-list">
                                {this.renderContacts()}
                            </ul>
                        </div>

                    }

                </section>
            </div>
        );
    }
}

export default Admin;