

require('normalize.css/normalize.css');

import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Button, Card, Row, Col, Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';


class Register extends React.Component {

	render() {
		constructor(){
			super();
			this.state = {
				forShelter: true,
				name: "".
				city: "".
				state: "",
				postal: ""
			}

			this.register = this.register.bind(this);
		}


		register(){

		}

		return(
			<div> 
				<Row>
			    <Input  l={6} m={6} s={6} label="Shelter Name"/>
			    
			    <Input l={6} m={6} s={6}  label="City"  />
			    <Input l={6} m={6} s={6}  label="State"  />
			   	<Input l={6} m={6} s={6}  label="Postal/ZIP code"  />
			   
			    
			</Row>

			<Button waves='light'>Register</Button>

			</div>
		);
	}
}

Register.defaultProps = {
};

export default Register;