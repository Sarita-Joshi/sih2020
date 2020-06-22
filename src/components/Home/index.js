import React from 'react';
import { withAuthorization } from '../Session';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import ReactSearchBox from 'react-search-box'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

 var data = [
  {
    key: 'Ram',
    value: 'Ram Sharma',
  },
  {
    key: 'Kiran',
    value: 'Kiran Rathod',
  },
  
]

var columnDefs= [{
  headerName: "Patient Id", field: "make", sortable: true, filter: true
}, {
  headerName: "Previous visit", field: "model", sortable: true, filter: true
  },{
  headerName: "Diagnosis", field: "price", sortable: true, filter: true
}];
var rowData= [{
  make: "1234", model: "1/1/2020", price: "Cold, viral fever"
}, {
  make: "1234", model: "20/6/2019", price: "Pink eye"
}, {
  make: "1234", model: "3/4/2019", price: "Knee pain"
}];


const Signinpatient = () => (
  <p>
     <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);
const HomePage = () => (
  <div>
  <div class="wrap">
   <div class="search">
     <center><label>Search a patient</label></center>
   <ReactSearchBox 
      placeholder="Enter patient name"
      data={data}
      onSelect={event =>  window.location.href=ROUTES.SPEECH}
      onFocus={() => {
        console.log('This function is called when is focussed')
      }}

      onChange={value => console.log(value)}
      fuseConfigs={{
        threshold: 0.05,
      }}
      value=" "
    />
</div>
 <br/>
    <h4>Or</h4>
    <br/>
    
    <h3> <Link to={ROUTES.PATIENT_REG}>Register new patient</Link></h3>
  </div>

  {/* <div
        className="ag-theme-alpine"
        style={{
        height: '250px',
        width: '600px' }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}>
        </AgGridReact>
      </div> */}
  </div>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
