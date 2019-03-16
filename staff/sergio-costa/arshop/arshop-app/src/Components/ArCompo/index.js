import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'

class ArCompo extends Component {

    onClose = () => this.props.history.replace('/')

    componentDidMount(){

    }

    render() {
        // return <section className="ar">
        //     <a-scene artoolkit="sourceType: webcam" >
        //         <div className="profile">
        //             Hello world!
        //         </div>
        //         <a-marker preset="hiro">
        //             {/* <a-gltf-model src={`models/${folder}/scene.gltf`} rotation="-90 0 0"></a-gltf-model> */}
        //             <a-entity geometry="primitive: box" material="color: red" position="0 0 0" />
        //             {/* <a-entity obj-model="obj: url(public/models/scene.gltf)" position="0 0 0"></a-entity> */}
        //         </a-marker>
        //         <a-entity camera>
        //         </a-entity>
        //     </a-scene>
        // </section>

        return <section className="ar">
            <a-scene artoolkit="sourceType: webcam">
                <button className="profile">
                    holas
                </button>
                <a-marker-camera preset="hiro">
                    <a-entity visible="true" />
                    <a-entity position="0 0.5 0" geometry="primitive:cone; radiusBottom: 0.01; radiusTop:0.65;height:0.5" material="color:red;side:double;opacity: 0.2; transparent: true;" />
                    <a-entity line="start: 0 0 0; end: 1 1 1; color: red"
                        line__2="start: 0 0 0; end: 1 1 -1; color: green" line__3="start: 0 0 0; end: -1 1 -1; color: blue" line__4="start: 0 0 0; end: -1 1 1; color: pink"></a-entity>
                    <a-plane position="0 0 0" color="yellow" rotation="-90 0 0" ></a-plane>
                </a-marker-camera>
            </a-scene>
        </section>

        // return <section className="ar">
        //     <a-scene artoolkit="sourceType: webcam">
        //         <button className="profile">
        //             holas
        //         </button>
        //         <a-marker preset="hiro">
        //             <a-entity visible="true" />
        //             <a-entity position="0 0.5 0" geometry="primitive:cone; radiusBottom: 0.01; radiusTop:0.65;height:0.5" material="color:red;side:double;opacity: 0.2; transparent: true;" />
        //             <a-entity line="start: 0 0 0; end: 1 1 1; color: red"
        //                 line__2="start: 0 0 0; end: 1 1 -1; color: green" line__3="start: 0 0 0; end: -1 1 -1; color: blue" line__4="start: 0 0 0; end: -1 1 1; color: pink"></a-entity>
        //             <a-animation attribute="rotation" position="0 0 0"
        //                 dur="5000"
        //                 fill="forwards"
        //                 to="0 360 0"
        //                 repeat="indefinite" easing="linear"></a-animation>
        //             <a-plane position="0 0 0" color="yellow" rotation="-90 0 0" ></a-plane>
        //         </a-marker>
        //         <a-entity camera></a-entity>
        //     </a-scene>
        // </section>

        return <section className="ar">
            <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
                <button className="ar__btn" onClick={() => this.props.history.replace('/')}>
                    holas
                </button>
                <a-marker preset="hiro">
                    <a-entity visible="true" />
                    <a-entity position="0 0.5 0" geometry="primitive:cone; radiusBottom: 0.01; radiusTop:0.65;height:0.5" material="color:red;side:double;opacity: 0.2; transparent: true;" />
                    <a-entity line="start: 0 0 0; end: 1 1 1; color: red"
                        line__2="start: 0 0 0; end: 1 1 -1; color: green" line__3="start: 0 0 0; end: -1 1 -1; color: blue" line__4="start: 0 0 0; end: -1 1 1; color: pink"></a-entity>
                    <a-plane position="0 0 0" color="yellow" rotation="-90 0 0" ></a-plane>
                </a-marker>
                <a-marker-camera></a-marker-camera> 
            </a-scene>
        </section>
    }
}

export default withRouter(ArCompo)