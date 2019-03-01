import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
function Carrousel() {
  return (
    <BannerAnim
      autoPlay
      autoPlaySpeed={2500}
      autoPlayEffect={false}
    >
      <Element key="aaa"
        prefixCls="banner-user-elem"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(https://s23527.pcdn.co/wp-content/uploads/2018/12/notebook-745x497.jpg.optimal.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <QueueAnim name="QueueAnim">
          <h1 key="h1">Create Your Own Books</h1>
          <p key="p">You just need a text editor</p>
        </QueueAnim>
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
          and just upload a file!
        </TweenOne>
      </Element>
      <Element key="bbb"
        prefixCls="banner-user-elem"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(https://farm8.staticflickr.com/7204/6966883093_5fa64ed49e_b.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <QueueAnim name="QueueAnim">
          <h1 key="h1">Display on your screen</h1>
          <p key="p">Or download it and enjoy it everywhere</p>
        </QueueAnim>
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
        </TweenOne>
      </Element>
    </BannerAnim>
  );
}

export default Carrousel;