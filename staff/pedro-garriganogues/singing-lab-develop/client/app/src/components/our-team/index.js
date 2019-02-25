import React, { Component } from 'react'
import './index.css'
import Footer from '../footer'

class OurTeam extends Component {

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <main>
                <div className="our-team-app">
                    <h1 className="my-4 flying-title">About Us
                    </h1>
                    <h2 className="flying-subtitle">...It's Nice to Meet You!</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, explicabo dolores ipsam aliquam inventore corrupti eveniet quisquam <strong className="quod">quod</strong> totam laudantium repudiandae obcaecati ea consectetur debitis velit facere nisi expedita vel?</p>
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="my-4 our-team-title">Our Team</h2>
                            <i className="fas fa-rocket flying-rocket"></i>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center mb-4 our-team-image-div our-team-first-image">
                            <img className="our-team-image rounded-circle img-fluid d-block mx-auto" width="200px" height="200px" src="https://res.cloudinary.com/duuegw4uf/image/upload/v1529264804/our-team/Screen_Shot_2018-06-17_at_21.44.53.png" alt="" />
                            <h3 className="our-team-image-title">David Monreal <small> - Mezzo</small> </h3>
                           
                            <p>A classical trained singer known for his colorful high voice. Expert in interpreting XVII century operetas.</p>

                        </div>
                        <div className="col-lg-4 col-sm-6 text-center mb-4 our-team-image-div">
                            <img className="our-team-image rounded-circle img-fluid d-block mx-auto" width="200px" height="200px" src="https://res.cloudinary.com/duuegw4uf/image/upload/v1529416249/our-team/Screen_Shot_2018-06-19_at_15.50.00.png" alt="" />
                            <h3 className="our-team-image-title">Charles Branch
                                <small> - Tenor</small>
                            </h3>
                            <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center mb-4 our-team-image-div">
                            <img className="our-team-image rounded-circle img-fluid d-block mx-auto" width="200px" height="200px" src="https://res.cloudinary.com/duuegw4uf/image/upload/v1529416511/our-team/Screen_Shot_2018-06-19_at_15.54.26.png" alt="" />

                            <h3 className="our-team-image-title">Alex Slim
                            <small> - Baritone</small>
                            </h3>
                            <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center mb-4 our-team-image-div">
                            <img className="our-team-image rounded-circle img-fluid d-block mx-auto" width="200px" height="200px" src="https://a1-images.myspacecdn.com/images03/3/145c1207ebd7449bb3eeff38022bb3c7/300x300.jpg" alt="" />
                            <h3 className="our-team-image-title">Manuel Barzi
                             <small> - Tenor</small>
                            </h3>
                            <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center mb-4 our-team-image-div">
                            <img className="our-team-image rounded-circle img-fluid d-block mx-auto" width="200px" height="200px" src="https://res.cloudinary.com/duuegw4uf/image/upload/v1529417659/our-team/Screen_Shot_2018-06-19_at_16.13.21.png" alt="" />
                            <h3 className="our-team-image-title">Agrettsuko
                            <small> - Soprano</small>
                            </h3>
                            <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center mb-4 our-team-image-div">
                            <img className="our-team-image rounded-circle img-fluid d-block mx-auto" width="200px" height="200px" src="https://res.cloudinary.com/duuegw4uf/image/upload/v1529417344/our-team/Screen_Shot_2018-06-19_at_16.08.40.png" alt="" />
                            <h3 className="our-team-image-title">Pusheen
                            <small> - Meow?</small>
                            </h3>
                            <p>What does this team member to? Keep it short! This is also a great spot for social links!</p>
                        </div>
                    </div>
                    </div>

                <Footer />
            </main>
        )
    }

}

export default OurTeam