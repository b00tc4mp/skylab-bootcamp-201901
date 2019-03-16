import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass'
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
function Carrousel() {
  return (
    <BannerAnim
      autoPlay
      autoPlaySpeed={3500}
      autoPlayEffect={true}
    >
      <Element key="aaa"
        prefixCls="banner-user-elem"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/373465/pexels-photo-373465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
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
            backgroundImage: 'url(https://images.pexels.com/photos/1446272/pexels-photo-1446272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
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
      <Element key="ccc"
        prefixCls="banner-user-elem"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/33196/still-life-teddy-white-read.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <QueueAnim name="QueueAnim">
          <h1 key="h1">Personalize Books for children</h1>
          <p key="p">Your child will be protagonist</p>
        </QueueAnim>
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
        </TweenOne>
      </Element>

      <Element key="ddd"
        prefixCls="banner-user-elem"
      >
        <BgElement
          key="bg"
          className="bg"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1425146/pexels-photo-1425146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <QueueAnim name="QueueAnim">
          <h1 key="h1" className="white">Write your own books and share it with everyone</h1>
          <p key="p" className="white">Remember to tag so everyone can personalize</p>
        </QueueAnim>
        <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
        </TweenOne>
      </Element>
    </BannerAnim>
  );
}

export default Carrousel;