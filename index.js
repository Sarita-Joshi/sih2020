import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignInLink } from '../SignIn';
import { withFirebase } from '../Firebase';
import './index.css';
import * as ROUTES from '../../constants/routes';
const SignUpPage = () => (
  <form id="signupform">
  <div>
    <h1>SignUp</h1><br/>
    <SignUpForm/>
    <SignInLink/>
    <br/>
  </div>
  </form>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
	
	this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
	  const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }
  onChange = event => {
	  this.setState({ [event.target.name]: event.target.value });
  };
  render() {
	  const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
	
	const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
	  
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group ">
                    <label>Full Name</label>
	  <input
          name="username" className="form-control"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        /></div>
        <div className="form-group ">
                    <label>Email address</label>
        <input
          name="email" className="form-control"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        /></div>
        <div className="form-group ">
                    <label>Password</label>
        <input
          name="passwordOne" className="form-control"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        /></div>
        <div className="form-group ">
                    <label>Confirm Password</label>
        <input
          name="passwordTwo" className="form-control"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        /></div><br/>
        <button disabled={isInvalid}  className="btn btn-primary btn-block" type="submit">
          Sign Up
        </button><br/>
        {error && <p>{error.message}</p>}
	  
      </form>
    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm =withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };