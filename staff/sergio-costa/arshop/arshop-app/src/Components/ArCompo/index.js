import React, { Component } from 'react'

class ArCompo extends Component {

    render(){
        return <section>
            <a-scene stats artoolkit="sourceType: webcam">
                <a-marker preset="hiro">
                    {/* <a-gltf-model src={`models/${folder}/scene.gltf`} rotation="-90 0 0"></a-gltf-model> */}
                    <a-entity geometry="primitive: box" material="color: red" position="0 0 0"/>
                    {/* <a-entity obj-model="obj: url(public/models/scene.gltf)" position="0 0 0"></a-entity> */}
                </a-marker>
                <a-entity camera></a-entity>
            </a-scene>
        </section>
    }
}

export default ArCompo