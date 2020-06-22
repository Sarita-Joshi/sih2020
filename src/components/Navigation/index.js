import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);


const NavigationAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
        <Link className="navbar-brand" to={"/home"}>PRESSO</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
             
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.SPEECH}>Presciption</Link>
    </li>
    <li className="nav-item">
      <Link  className="nav-link" to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li className="nav-item">
      <SignOutButton />
    </li>
    </ul>
          </div>
        </div>
      </nav>
      
      );
const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-light fixed-top  ">
        <div className="container">
        <Link className="navbar-brand" to={ROUTES.SIGN_IN}><span className="sm-0 h2">PRESSO</span></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">           

     
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.LANDING}>About us</Link>
    </li>

   
    <li className="nav-item">
    <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    </ul>
          </div>
        </div>
      </nav>
  
);

export default Navigation;
