import React, {Component, Fragment} from 'react'
import './index.sass'

class Header extends Component {


    render() {
        return (
        <Fragment>
        <nav class="navbar navbar-expand-lg navbar-light bg-light navigation">
        <a href="#" class="btn btn-info btn-lg">
        <img width = "25px" height="25px" src="http://www.iconarchive.com/download/i99376/dtafalonso/android-lollipop/Play-Books.ico"></img>
          <span class="glyphicon glyphicon-book"></span> Your Book Creator
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Create Book</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Your books
                </a>
                {/* <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Book1</a>
                <a class="dropdown-item" href="#">Book2</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Book3</a>
                </div> */}
            </li>

            <li className="nav-item">
                <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Login or Register!
                </a> {/*Modal */}
            </li>
            </ul>

{/*             
             */}
{/* 


            <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
        </div>
        </nav>
      </Fragment>)
    }
}
export default Header;