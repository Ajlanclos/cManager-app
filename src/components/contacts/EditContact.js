import React, { Component } from 'react';
import { Consumer } from '../../context';
import Axios from 'axios';

import TextInputGroup from '../layout/TextInputGroup';

class EditContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await Axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = res.data;

        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        })
    }

    onFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onFormSubmit = async (dispatch, e) => {
        e.preventDefault();

        const { name, email, phone } = this.state;

        // Check for erros
        if(name === '') {
            this.setState({
                errors: {
                    name: 'Name is Required!'
                }
            });
            return;
        }

        if(email === '') {
            this.setState({
                errors: {
                    email: 'Email is Required!'
                }
            });
            return;
        }

        if(phone === '') {
            this.setState({
                errors: {
                    phone: 'Phone is Required!'
                }
            });
            return;
        }

        const updContact = {
            name, 
            email,
            phone
        }

        const { id } = this.props.match.params;

        const res = await Axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

        dispatch({
            type: 'EDIT_CONTACT',
            payload: res.data
        });

        // Clear state -- clear form
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        // Redirect to homepage
        this.props.history.push('/');

    }

  render() {
    
    const { name, email, phone, errors } = this.state;

    return (
        <Consumer>
            {value => {

                const { dispatch } = value;

                return (
                    <div>
                        <h1 className="display-4 mb-2"><span className="text-danger">Edit</span> Contact</h1>    
                        <div className="card mb-3">
                            <div className="card-body">
                                <form onSubmit={this.onFormSubmit.bind(this, dispatch)}>
                                    <TextInputGroup 
                                        label="Name"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Name..."
                                        name="name"
                                        value={name}
                                        onChange={this.onFormChange}
                                        error={errors.name}
                                    />
                                    <TextInputGroup 
                                        label="Email"
                                        type="email" 
                                        className="form-control form-control-lg"
                                        placeholder="Enter Email..."
                                        name="email"
                                        value={email}
                                        onChange={this.onFormChange}
                                        error={errors.email}
                                    />
                                    <TextInputGroup 
                                        label="Phone"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Phone..."
                                        name="phone"
                                        value={phone}
                                        onChange={this.onFormChange}
                                        error={errors.phone}
                                    />
                                    <input 
                                        type="submit" 
                                        value="Edit Contact"
                                        className="btn btn-light btn-block"
                                        />
                                </form>
                            </div>
                            </div>
                            </div>
                  );
            }}
        </Consumer>
    )
    
  }
}

export default EditContact;