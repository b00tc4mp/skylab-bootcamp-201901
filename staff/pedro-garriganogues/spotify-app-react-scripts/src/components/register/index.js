class ButtonRegister extends React.Component {
	constructor() {
		super()
	}

	changeToRegister = event => {
		event.preventDefault()
		this.props.onRegister()
	}

	render() {
		return <section className="d-flex justify-content-center">
			< button onClick={this.changeToRegister} className="btn"> Register</button >
		</section >
	}
}


class RegisterSection extends React.Component {
	state = { name: '', surname: '', email: '', password: '', passwordconf: '', }

	handleInputChange = event => this.setState({ [event.target.name]: event.target.value })

	render() {
		return <section className="d-flex justify-content-center">
			<form className="border-rounded col-md-1">
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




