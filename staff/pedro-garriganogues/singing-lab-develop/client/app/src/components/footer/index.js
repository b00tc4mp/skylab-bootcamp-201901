import React from 'react'
import './index.css'

function Footer (){
        return (
            <footer className=" py-5 footer">
            <div className="row">
              <div className="col-12 col-md">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="d-block mb-2">
                  <circle cx={12} cy={12} r={10} />
                  <line x1="14.31" y1={8} x2="20.05" y2="17.94" />
                  <line x1="9.69" y1={8} x2="21.17" y2={8} />
                  <line x1="7.38" y1={12} x2="13.12" y2="2.06" />
                  <line x1="9.69" y1={16} x2="3.95" y2="6.06" />
                  <line x1="14.31" y1={16} x2="2.83" y2={16} />
                  <line x1="16.62" y1={12} x2="10.88" y2="21.94" />
                </svg>
                <small className="d-block mb-3 text-muted">© 2017-2018</small>
              </div>
              <div className="col-6 col-md">
                <h5>Features</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <a className="text-muted">Cool stuff</a>
                  </li>
                  <li>
                    <a className="text-muted">Random feature</a>
                  </li>
                  <li>
                    <a className="text-muted">Team feature</a>
                  </li>
                  <li>
                    <a className="text-muted">Stuff for developers</a>
                  </li>
                  <li>
                    <a className="text-muted">Another one</a>
                  </li>
                  <li>
                    <a className="text-muted">Last time</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Resources</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <a className="text-muted">Resource</a>
                  </li>
                  <li>
                    <a className="text-muted">Resource name</a>
                  </li>
                  <li>
                    <a className="text-muted">Another resource</a>
                  </li>
                  <li>
                    <a className="text-muted">Final resource</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>About</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <a className="text-muted">Team</a>
                  </li>
                  <li>
                    <a className="text-muted">Locations</a>
                  </li>
                  <li>
                    <a className="text-muted">Privacy</a>
                  </li>
                  <li>
                    <a className="text-muted">Terms</a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        )
}

export default Footer