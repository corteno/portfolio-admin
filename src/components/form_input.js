import React, {Component} from 'react';

class FormInput extends Component {
    render() {
        return (
            <div className={"form-input-wrapper " + this.props.className}>
                <input
                    type={this.props.type}
                    className={'form-input'}
                    name={this.props.name}
                    value={
                        this.props.value ? this.props.value : ''
                    }
                    onChange={event => this.props.onInputChange(event)}
                    required={true}
                />
                <div className="bar"></div>
                <label className="form-label" htmlFor="">{this.props.label}</label>
            </div>

        );
    }
}

export default FormInput;