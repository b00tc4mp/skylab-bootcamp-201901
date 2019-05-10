function register(name = '', surname = '', email = '', message = '') {
    return `<h2>Register</h2>
        <form method="post" action="/register">
            <input type="text" name="name" required placeholder="name" autofocus ${name && `value="${name}"`}>
            <input type="text" name="surname" required placeholder="surname" ${surname && `value="${surname}"`}>
            <input type="email" name="email" required placeholder="e-mail" ${email && `value="${email}"`}>
            <input type="password" name="password" required placeholder="password">
            ${message && `<p>${message}</p>`}
            <button>Register</button>
        </form>`
}

module.exports = register