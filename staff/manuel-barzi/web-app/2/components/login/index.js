function login(email = '', message = '') {
    return `<h1>Login</h1>
    <form method="post" action="/login">
            <input type="text" name="email" placeholder="email" autofocus required ${email && `value="${email}"`}>
            <input type="password" name="password" placeholder="password" required>
            ${message && `<p>${message}</p>`}
            <button>Login</button>
        </form>`
}

module.exports = login