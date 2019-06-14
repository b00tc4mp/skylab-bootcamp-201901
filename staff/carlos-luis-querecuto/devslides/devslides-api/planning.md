registerUser -> post -> /users 
authenticateUser -> post -> /users/auth 
retrieveUser -> get -> /users 
updateUser -> put -> /users
deleteUser -> post -> /users
        -----   -----
createPresentation -> post -> /presentations
deletePresentation -> delete -> /presentations
retrievePresentation -> get -> /presentations/:id
updatePresentationTitle -> put -> /presentations
        -----   -----
updateSlideStyle -> put -> /presentations/slides/style *
        -----   -----
createSlide -> post -> /presentations/slides
updateSlide -> put -> /presentations/slides
deleteSlide -> delete -> /presentations/slides
        -----   -----
createElement -> post -> /presentations/slides/elements
deleteElement -> delete -> /presentations/slides/elements

