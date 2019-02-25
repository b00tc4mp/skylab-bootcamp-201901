import React, {Component} from 'react'
import './index.css'
import swal from 'sweetalert2'

class LandingMain extends Component {

   details = () => {
    swal({
        title: 'Details',
        width: 500,
        padding: '3em',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://media.giphy.com/media/shIRdgYzujbZC/giphy.gif")
          center left
          no-repeat
        `
      })
   }

    render() {
        return (
            <main>
                <div className="row landing-center-div">
                    <div className="col-lg-4">
                        <img className="rounded-circle rounded-circle-images" src="/images/hayley.png" alt="Generic placeholder" width={140} height={140} />
                        <h2 className="landing-center-div-titles">Lorem</h2>
                        <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula
            ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>

                        <a className="btn btn-outline-secondary circle-image-button" onClick={() => this.details()} role="button">View details »</a>

                    </div>
                    {/* /.col-lg-4 */}
                    <div className="col-lg-4">
                        <img className="rounded-circle rounded-circle-images" src="/images/corey.png" alt="Generic placeholder" width={140} height={140} />
                        <h2 className="landing-center-div-titles">Ipsum</h2>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis
                          consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
            nibh.</p>

                        <a className="btn btn-outline-secondary circle-image-button" onClick={() => this.details()} role="button">View details »</a>

                    </div>
                    {/* /.col-lg-4 */}
                    <div className="col-lg-4">
                        <img className="rounded-circle rounded-circle-images" src="/images/bruno-mars.png" alt="Generic placeholder" width={140} height={140} />
                        <h2 className="landing-center-div-titles">Amet</h2>
                        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta
                          felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
            massa justo sit amet risus.</p>
                        <a className="btn btn-outline-secondary circle-image-button" onClick={() => this.details()} role="button">View details »</a>
                    </div>
                    {/* /.col-lg-4 */}
                </div>
            </main>
        )
    }
}

export default LandingMain