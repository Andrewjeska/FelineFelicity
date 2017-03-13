


require('normalize.css/normalize.css');

import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Button, Card, Row, Col, Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';


class Login extends React.Component {

	render() {
		return(
			<div> 
				<Row>
			    <Input placeholder="ilovecats@gmail.com" l={6} m={6} s={6} label="Email" />
			    <Col l={6} m={6} s={6}/>
			    <Input placeholder="NOT your kitty's name ;)" type="password" label="password" l={6} m={6} s={6} />
			    <Col l={6} m={6} s={6}/>
			    
			</Row>

			<Button waves='light'>Login</Button>

			</div>
		);
	}
}

Login.defaultProps = {
};

export default Login;