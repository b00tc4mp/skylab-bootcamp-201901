import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Scene, Entity } from 'aframe-react'
import './index.sass'

class ArCompo extends Component {

    onClose = () => this.props.history.replace('/')

    componentDidMount() {

    }

    render() {
        // mas o menos correcto, tocando posicion y sin UI
        return <section className="ar">
            <Scene stats embedded arjs={{ sourceType: 'webcam', debugUIEnabled: 'false' }}>
                <div>
                    <button className="ar__btn">BACK</button>
                </div>
                <a-marker preset="hiro">
                    {/* <a-gltf-model src={`models/seat/scene.gltf`} scale="1 1 1"></a-gltf-model> */}
                    <a-entity obj-model="obj: url(models/police/Aston VULCAN.obj)" position="0 0 0" rotation="-90 180 180" scale="0.0009 0.0009 0.0009"></a-entity>
                    {/* <Entity geometry={{ primitive: 'box', width: '1', height: '1' }}
                        position={{ x: 0, y: 0, z: -1 }} /> */}
                </a-marker>
                <Entity camera />
            </Scene>
        </section>


        //mas o menos bien pero se mueve mucho
        // return <section className="ar">
        //     <Scene embedded artoolkit={{ sourceType: 'webcam', trackingMethod: 'best'}}>
        //         <a-marker-camera preset="hiro">
        //             <Entity geometry={{ primitive: 'box', width: '1', height: '1' }} />
        //             <a-gltf-model src={`models/seat1/scene.gltf`} scale="0.01 0.01 0.01"></a-gltf-model>
        //         </a-marker-camera>
        //         <a-marker-camera/>
        //     </Scene>
        // </section>

        //bastante bien
        // return <section className="ar">
        //     <Scene embedded artoolkit={{ sourceType: 'webcam', trackingMethod: 'best' }}>
        //         <div>
        //             <button className="ar__btn">BACK</button>
        //         </div>
        //         <a-marker preset="hiro">
        //             <a-gltf-model src={`models/seat1/scene.gltf`} scale="0.01 0.01 0.01"></a-gltf-model>
        //             <Entity geometry={{ primitive: 'box', width: '1', height: '1' }} />
        //         </a-marker>
        //         <a-camera-static />
        //     </Scene>
        // </section >

    }
}

export default withRouter(ArCompo)