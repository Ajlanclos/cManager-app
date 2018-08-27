import React, { Component } from 'react';
import { Consumer } from '../../context';
import Axios from 'axios';

import TextInputGroup from '../layout/TextInputGroup';

class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
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

        const newContact = {
            name: name,
            email: email,
            phone: phone,
        }

        console.log(newContact);

        // HTTP POST 
        const res = await Axios.post('https://jsonplaceholder.typicode.com/users', newContact)
   
        dispatch({
            type: 'ADD_CONTACT',
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
                        <h1 className="display-4 mb-2"><span className="text-danger">Add</span> Contact</h1>    
                        <div className="card mb-3">
                            <div className="card-header">Add Contact</div>
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
                                        value="Add Contact"
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

export default AddContact;