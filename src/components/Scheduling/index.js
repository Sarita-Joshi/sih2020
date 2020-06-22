import React, { Component } from 'react';
import * as ROLES from '../../constants/roles';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';
class scheduling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
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
  
  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1>DOCTOR</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
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

export default withFirebase(scheduling);