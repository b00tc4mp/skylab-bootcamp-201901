import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React, {Component, Fragment, withRouter} from 'react';
import ReactDOM from 'react-dom';
import './index.sass'
import SideBar from '../sidebar';
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
function Books() {
  return (<Fragment>
    <div>
      <SideBar></SideBar>
    </div>
    {/* TODO */}
    <div className="rightsidebar c_yourbooks">
      <h1>These are your books</h1>
      <p>Lorem Ipsum</p> 
    </div>
    </Fragment>
    );
}

export default Books;