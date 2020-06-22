import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';

import firebase from 'firebase';
import Navigation from '../Navigation';

const SchedulePage = () => (
  <div>
    <h1>Schedule (Assistant)</h1>
		<SignUpForm/>
  </div>
  
);



const INITIAL_STATE = {
  name: '',
  rid: '',  
  error: null,
  users: [],
 loading: false,
};

class AppointmentFormBase extends Component {
  constructor(props) {
    super(props);
	
	this.state = { ...INITIAL_STATE };
  }
  
  componentDidMount() {
    this.setState({ loading: true });
    firebase.database().ref('patients').on('value', snapshot => {
        const usersObject = snapshot.val();
		const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));	  
      this.setState({
        users: usersList,
        loading: false,
      });
    });       
  }
  
  componentWillUnmount() {
    firebase.database().ref('patients').off();
  }
  
  onSubmit = event => {
    const a1 = { 
      name:this.state.name, 
      rid:this.state.rid,
    };
    
      var ref = firebase.database().ref('/patients/');
      var newRef = ref.push();
        newRef.set(a1);
    console.log('DATA SAVED');
    
  }

  onChange = event => {
	  this.setState({ [event.target.name]: event.target.value });
  };
  render() {
	  const {
      name,
      rid,
      error,
      users,
      loading,
    } = this.state;
	
	const isInvalid = rid === '' || name === '';
	  
    return (
      <div>
        <div class="addForm">
            <form onSubmit={this.onSubmit}>
              <input
                name="name"
                value={name}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              /><br/>
              <input
                name="rid"
                value={rid}
                onChange={this.onChange}
                type="text"
                placeholder="ID"
              /><br/>        
              <button disabled={isInvalid} type="submit">
                Appoint
              </button>
              {error && <p>{error.message}</p>}	  
            </form>
        </div>
        <div>
          <h2>Patients</h2>
          {loading && <div>Loading ...</div>}
          <UserList users={users} />
        </div>
    </div>
    );
  }
}
const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.rid}>
        <span>
          <strong>ID:</strong> {user.rid}
        </span>
        
        <span>
          <strong>Name:</strong> {user.name}
        </span>
      </li>
    ))}
  </ul>
);

const SignUpForm =withRouter(withFirebase(AppointmentFormBase));

export default SchedulePage;

export { SignUpForm };