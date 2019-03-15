import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './index.sass'

let ww = window.innerWidth
let wh = window.innerHeight

class CanvasLanding extends Component {

    componentDidMount() {

        let canvas = this.canvas
        let bg = this.bg
        let ctx = this.canvas.getContext("2d")

        this.canvas.style.width = this.bg.offsetWidth
        this.canvas.style.height = this.bg.offsetHeight

        this.canvas.style.position = 'absolute'
        this.canvas.style.top = '100px'
        this.canvas.style.left = '100px'

        

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                function(callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        
        
        function init() {} //end init
        
        function animate() {
            window.requestAnimFrame(animate);
            draw();
        }
        
        function draw() {
        
            //setup canvas enviroment
            let time = new Date().getTime() * 0.002;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
        
            // random float to be used in the sin & cos
            let randomX = random(.2, .9);
            let randomY = random(.1, .2);
        
            // sin & cos for the movement of the triangles in the canvas
            let rectX = Math.cos(time * 1) * 1.5 + randomX;
            let rectY = Math.sin(time * 1) * 1.5 + randomY;
            let rectX2 = Math.cos(time * .7) * 3 + randomX;
            let rectY2 = Math.sin(time * .7) * 3 + randomY;
            let rectX3 = Math.cos(time * 1.4) * 4 + randomX;
            let rectY3 = Math.sin(time * 1.4) * 4 + randomY;
        
            // colors ===================================
            let blue = "rgba(159,178,198,0.8)"
            let green = "rgba(134,159,161,0.8)"
            let purple = "rgba(135,101,114,0.8)"
            let red = "rgba(211,104,122,0.8)"
            let orange = "rgba(228,139,123,0.8)"
            let yellow = "rgba(236,208,120,0.8)"    
        
            //triangle group 1 ===========================================
            // triangle 1.1
            ctx.beginPath();
            ctx.moveTo(rectX2 + 120, rectY2 - 100);
            ctx.lineTo(rectX2 + 460, rectY2 + 80);
            ctx.lineTo(rectX2 + 26, rectY2 + 185);
            ctx.fillStyle = blue;
            ctx.fill();
        
            //triangle 1.2
            ctx.beginPath();
            ctx.moveTo(rectX - 50, rectY - 25);
            ctx.lineTo(rectX + 270, rectY + 25);
            ctx.lineTo(rectX - 50, rectY + 195);
            ctx.fillStyle = green;
            ctx.fill();
        
            //triangle 1.3
            ctx.beginPath();
            ctx.moveTo(rectX3 - 140, rectY3 - 150);
            ctx.lineTo(rectX3 + 180, rectY3 + 210);
            ctx.lineTo(rectX3 - 225, rectY3 - 50);
            ctx.fillStyle = purple;
            ctx.fill();
        
            //triangle group 2 ===========================================
            // triangle 2.1
            ctx.beginPath();
            ctx.moveTo(rectX + (canvas.width - 40), rectY - 30);
            ctx.lineTo(rectX + (canvas.width + 40), rectY + 190);
            ctx.lineTo(rectX + (canvas.width - 450), rectY + 120);
            ctx.fillStyle = orange;
            ctx.fill();
            
            // triangle 2.2
            ctx.beginPath();
            ctx.moveTo(rectX3 + (canvas.width - 200), rectY3 - 240);
            ctx.lineTo(rectX3 + (canvas.width + 80), rectY3 - 240);
            ctx.lineTo(rectX3 + (canvas.width - 50), rectY3 + 460);
            ctx.fillStyle = red;
            ctx.fill();
            
            // triangle 2.3
            ctx.beginPath();
            ctx.moveTo(rectX2 + (canvas.width - 400), rectY2 + 140);
            ctx.lineTo(rectX2 + (canvas.width + 20), rectY2 + 200);
            ctx.lineTo(rectX2 + (canvas.width - 250), rectY2 + 270);
            ctx.fillStyle = purple;
            ctx.fill();
            
            //triangle group 3 ===========================================
            // triangle 3.1
            ctx.beginPath();
            ctx.moveTo(rectX3 - 50, rectY3 + (canvas.height - 350));
            ctx.lineTo(rectX3 + 350, rectY3 + (canvas.height - 220));
            ctx.lineTo(rectX3 - 100, rectY3 + (canvas.height - 120));
            ctx.fillStyle = red;
            ctx.fill();
            
            // triangle 3.2
            ctx.beginPath();
            ctx.moveTo(rectX + 100, rectY + (canvas.height - 380));
            ctx.lineTo(rectX + 320, rectY + (canvas.height - 180));
            ctx.lineTo(rectX - 275, rectY + (canvas.height + 150));
            ctx.fillStyle = purple;
            ctx.fill();
            
            // triangle 3.3
            ctx.beginPath();
            ctx.moveTo(rectX2 - 230, rectY2 + (canvas.height - 50));
            ctx.lineTo(rectX2 + 215, rectY2 + (canvas.height - 110));
            ctx.lineTo(rectX2 + 250, rectY2 + (canvas.height + 130));
            ctx.fillStyle = yellow;
            ctx.fill();
            
            //triangle group 4 ===========================================
            // triangle 4.1
            ctx.beginPath();
            ctx.moveTo(rectX3 + (canvas.width - 80), rectY3 + (canvas.height - 320));
            ctx.lineTo(rectX3 + (canvas.width + 250), rectY3 + (canvas.height + 220));
            ctx.lineTo(rectX3 + (canvas.width - 200), rectY3 + (canvas.height + 140));
            ctx.fillStyle = purple;
            ctx.fill();
            
            // triangle 4.2
            ctx.beginPath();
            ctx.moveTo(rectX + (canvas.width - 100), rectY + (canvas.height - 160));
            ctx.lineTo(rectX + (canvas.width - 30), rectY + (canvas.height + 90));
            ctx.lineTo(rectX + (canvas.width - 420), rectY + (canvas.height + 60));
            ctx.fillStyle = orange;
            ctx.fill();
            
            // triangle 4.3
            ctx.beginPath();
            ctx.moveTo(rectX2 + (canvas.width - 320), rectY2 + (canvas.height - 200));
            ctx.lineTo(rectX2 + (canvas.width - 50), rectY2 + (canvas.height - 20));
            ctx.lineTo(rectX2 + (canvas.width - 420), rectY2 + (canvas.height + 120));
            ctx.fillStyle = yellow;
            ctx.fill();
        
            ctx.restore();
        
        } //end function draw
        
        //call init
        init();
        animate();
    }

    
    render() {
        return <div className="hero">
                <div className="inner">
                    <h1>welcome to flare</h1>
                    <p>Quick animation prototype to explore an idea for the hero of my personal portfolio. This was created using a canvas as a background where the triangles are drawn and animates with a overlay gradient on top of the canvas.</p>
                    <p>Feel free to share and use it as inspiration for any of you projects, and if you like it show some love by following me on</p>
                </div>
                <div className="login-down"><Link to="/login" className="login-down__text">login</Link></div>
                <div className="background" ref={(ref) => (this.bg = ref)}>
                    <canvas id="hero-canvas" width="1920" height="1080" ref={(ref) => (this.canvas = ref)}></canvas>
                </div>
            </div>
    }
}

export default withRouter(CanvasLanding)