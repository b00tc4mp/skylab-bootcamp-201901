var loginPanel = new LoginPanel();
var homePanel = new HomePanel();
var registerPanel = new RegisterPanel();
var searchPanel = new SearchPanel();

document.body.appendChild(loginPanel.element);
document.body.appendChild(homePanel.element);
document.body.appendChild(registerPanel.element);

homePanel.element.appendChild(searchPanel.element);

loginPanel.onLogin = function(email, password) {
  try {
    login(email, password, function(user) {
      loginPanel.hide();

      homePanel.user = user;
      homePanel.show();
    });
  } catch (err) {
    loginPanel.error = err.message;
  }
};

registerPanel.registration = function(
  name,
  surname,
  email,
  password,
  passwordConfirmation
) {
  try {
    register(name, surname, email, password, passwordConfirmation, function(
      user
    ) {
      registerPanel.hide();
      registerPanel.clear();
      loginPanel.show();
    });
  } catch (err) {
    registerPanel.error = err.message;
  }
};

loginPanel.onRegisterPanel = function() {
  loginPanel.hide();
  registerPanel.show();
};

homePanel.onLogout = function() {
  homePanel.hide();
  searchPanel.clear();
  loginPanel.clear();
  loginPanel.show();
};

searchPanel.onSearch = function(query) {
    try{
      logic.search(query, function(error,results){
        if(error) searchPanel.error = error;
        else searchPanel.results = results.map(function(result){
            return {
                text: resultList.title,
                image: resultList.imageUrl
            }
        });
    });
    catch(err){
      searchPanel.error = err.message;
    }
};


registerPanel.onLoginPanel = function() {
  registerPanel.hide();
  loginPanel.show();
  registerPanel.clear();
};

// var loginPanel2 = new LoginPanel

// document.body.appendChild(loginPanel2.element);

// loginPanel2.onLogin = function(email, password) {
//     console.log('llama a otra logica', email, password);
// };

// var mainPanel = new Panel

// var registerPanel = new RegisterPanel
// var welcomePanel = new WelcomePanel

// mainPanel.add(loginPanel)
// mainPanel.add(registerPanel)
// mainPanel.add(welcomePanel)

// loginPanel.onLogin = function() {}

// ...
