const title = <h1>Hello, world!</h1>

const loginPanel = <form>
    <input type="text" name="email" />
    <input type="password" name="password" />
    <button>Login</button>
</form>

const items = ['Tachi', 'Nico', 'Robert', 'Victor'].map(name => <li>{name}</li>)

const list = <ul>{items}</ul>

ReactDOM.render([title, loginPanel, list], document.getElementById('root'))