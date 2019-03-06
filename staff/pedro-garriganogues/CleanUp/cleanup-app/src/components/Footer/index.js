import React from 'react'
import './index.css'

function Footer() {
  return (
    <footer className=" py-5 footer">
      <div className="row">
        <div className="col-12 col-md">
        </div>
        <div className="col-6 col-md">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li>
              <p className="text-muted">Stuff</p>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Resources</h5>
          <ul className="list-unstyled text-small">
            <li>
              <p className="text-muted">Resources</p>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li>
              <p className="text-muted">Team</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer