module.exports = {
  
  selectedLanguage: 'en',
  set language(lang) {
    this.selectedLanguage = lang;
  },

  get language() {
    return this.selectedLanguage || "en";
  },

  get logout () { return this.__logout[this.selectedLanguage]},
  get landing () { return this.__landing[this.selectedLanguage]},
  get register () { return this.__register[this.selectedLanguage]},
  get admin () { return this.__admin[this.selectedLanguage]},
  get login () { return this.__login[this.selectedLanguage]},
  get home () { return this.__home[this.selectedLanguage]},
  get errors () { return this.__errors[this.selectedLanguage]},
  
  __logout: {
    en: {
      logout: "Log Out",
    },
    es: {
      logout: "Desconectarse",
    },
    ca: {
      logout: "Desconectarse",
    },
    ga: {
      logout: "Desconectarse",
    },
  },
  __landing: {
    en: {
      register: "Register",
      or: "or",
      login: "Login",
    },
    es: {
      register: "Regístrate",
      or: "o",
      login: "Inicia sesión",
    },
    ca: {
      register: "Registra't",
      or: "o",
      login: "Inicia sessió",
    },
    ga: {
      register: "Rexistrese",
      or: "ou",
      login: "Inicia sesión",
    },
  },
  __register: {
    en: {
      title: "Register",
      name: "Name",
      surname: "Surname",
      email: "E-mail",
      password: "Password",
    },
    es: {
      title: "Registro",
      name: "Nombre",
      surname: "Apellido",
      email: "E-milio",
      password: "Contraseña",
    },
    ca: {
      title: "Registre",
      name: "Nom",
      surname: "Cognom",
      email: "E-mil·li",
      password: "Contrasenya",
    },
    ga: {
      title: "Rexistro",
      name: "Nome",
      surname: "Apelido",
      email: "E-miliño",
      password: "Contrasinal",
    },
  },
  __admin: {
    en: "Administrator",
    es: "Administrador",
    ca: "Gestor",
    ga: "Administrador",
  },
  __login: {
    en: {
      title: "Login",
      email: "E-mail",
      password: "Password",
    },
    es: {
      title: "Iniciar sesión",
      email: "E-milio",
      password: "Contraseña",
    },
    ca: {
      title: "Inici de sessió",
      email: "E-mil·li",
      password: "Contrasenya",
    },
    ga: {
      title: "Inicio da sesión",
      email: "E-miliño",
      password: "Contrasinal",
    },
  },
  __home: {
    en: {
      logout: "logout",
      buttonText: "Search",
    },
    es: {
      logout: "Desconectarse",
      buttonText: "Buscar",
    },
    ca: {
      logout: "Desconectarse",
      buttonText: "Buscar",
    },
    ga: {
      logout: "Desconectarse",
      buttonText: "Buscar",
    },
  },
  __errors: {
    en: {
      1: "wrong credentials",
      2: "name not provided",
      3: "surname not provided",
      4: "email not provided",
      5: "password not provided",
    },
    es: {
      1: "credenciales incorrectas",
      2: "nombre vacio",
      3: "apellidos vacio",
      4: "email vacio",
      5: "password vacio",
    },
    ca: {
      1: "credencials incorrectes",
      2: "nombre vacio",
      3: "apellidos vacio",
      4: "email vacio",
      5: "password vacio",
    },
    ga: {
      1: "credenciales incorrectas",
      2: "nome vacio",
      3: "apelidos vacio",
      4: "email vacio",
      5: "contrasinal vacio",
    },
  },
};
