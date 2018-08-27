import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Contact extends Component {

    state = {
        showContactInfo: false
    };

    onShowClick = () => {
        this.setState({
            showContactInfo: !this.state.showContactInfo
        })
    }

    deleteClick = async (id, dispatch) => {
        try {
            await Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)

            dispatch({
                type: 'DELETE_CONTACT', 
                payload: id
            });
        } catch(e) {
            // Wouldn't do this in a real world app...
            dispatch({
                type: 'DELETE_CONTACT', 
                payload: id
            });

            console.log('Received an error trying to delete, but still removed item from DOM. ERR: ' + e);
        }
        
    }

    render(props) {

        const { name, email, phone, id } = this.props.contact;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {value => {
                    
                    const { dispatch } = value;

                    return(
                        <div className="card card-body mb-3">
                            <h4>{name}
                                <i 
                                    className="fas fa-caret-down m-2"
                                    onClick={this.onShowClick} 
                                    style={{ cursor: 'pointer' }}
                                />
                                
                                <i 
                                    className="fas fa-times m-2 float-right text-danger"
                                    onClick={this.deleteClick.bind(this, id, dispatch)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <Link to={`contact/edit/${id}`}>
                                    <i 
                                        className="fas fa-pencil-alt fa-sm float-right text-dark m-2"
                                        style={{ cursor: 'pointer'}}
                                    />
                                </Link>
                            </h4> 
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                            ) : null}
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default Contact;