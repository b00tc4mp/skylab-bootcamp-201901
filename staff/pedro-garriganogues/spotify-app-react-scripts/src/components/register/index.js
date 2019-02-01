import React from 'react'




class RegisterSection extends React.Component {
	state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '', }

	handleInputChange = event => this.setState({ [event.target.name]: event.target.value })

	render() {
		return <section className="d-flex justify-content-center">
			<form className="border border-black border-rounded col-md-1">
				<label>Name:</label>
				<input type="text" name="name" placeholder="name" onChange={this.handleInputChange} />
				<label>Surname:</label>
				<input type="text" name="surname" placeholder="Surname" onChange={this.handleInputChange} />
				<label>Email:</label>
				<input type="text" name="email" placeholder="email" onChange={this.handleInputChange} />
				<label>Password:</label>
				<input type="text" name="password" placeholder="password" onChange={this.handleInputChange} />
				<label>Password Confirmation:</label>
				<input type="text" name="confirmPassword" placeholder="passwordConfirmation" onChange={this.handleInputChange} />
				<button className="btn m-1" >Register</button>
				<button className="btn m-1" >Login</button>
			</form>
		</section>
	}
}

export default RegisterSection



