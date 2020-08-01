import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import banner_img from './banner_img.png';
import * as ROUTES from '../../constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Mainpage extends Component    {
  
  render() {
    
    return (
          <Container fluid>
                    <div id="main" >

  <Row>
    <Col sm={7} id="p1">
    <h1>Changing the future of healthcare</h1>
                            <p>Presso is a platform that enables a doctor to make a prescription without touching pen and paper. It uses Voice recognition to take input from the doctor. Analyses the various components of the spoken text and categorizes them as Proper nouns, Medicine names, symptoms, etc and arranges them in proper order for a prescription.
It not only generates a prescription but also sends the same to the user's email id. </p>
                             <div class="wrapper">
                             <Link to={ROUTES.SIGN_IN}><button className="btn btn-primary btn-lg " > SIGN IN TO CONTINUE </button></Link>
                          </div>
      
    </Col>
    
    <Col sm={3}>
      <img src={banner_img} />
    </Col>
  </Row>
 
  </div>
  </Container>
    );
  }
}

export default Mainpage;