import React, { Component } from 'react'
import './gsap'
import './index.sass'

class CanvasLetters extends Component {
    state = { fake: null}

    componentDidMount() {
        // let colors = ["#EDEEC0", "#ED7B84", "#7397C3", "#7EB77F"]
        let colors = ["#ECCF78", "#D3707F", "#A1B3C6", "#8AA1A3"]
        let ctx = this.canvas.getContext("2d")
        let pathPointsFrom, pathPointsTo, pathPointsNow 
        let steps = 200
        let offset = 0
        let pathCount = 0
        let interpolationPoint = {percentage: 0}
        ctx.lineWidth = 8
        ctx.lineCap = "round"

        // var paths = [samplePath(this.circlePath), samplePath(this.rectPath), samplePath(this.trianglePath), samplePath(this.gerardPath)]
        var paths = [samplePath(this.letterW), samplePath(this.letterA), samplePath(this.letterT), samplePath(this.letterC), samplePath(this.letterH), samplePath(this.letterI), samplePath(this.letterN), samplePath(this.letterG)]

        function drawPathToCanvas() {
    
        var thisColor, lastColor = getColorSegment(0);
        ctx.strokeStyle = lastColor;
        ctx.beginPath();
        for (var i = 0, l = pathPointsNow.length; i < l; i++) {
            if (pathPointsNow[i+1]) {
            ctx.moveTo(pathPointsNow[i].x, pathPointsNow[i].y);
            ctx.lineTo(pathPointsNow[i+1].x, pathPointsNow[i+1].y);
            } else {
            ctx.lineTo(pathPointsNow[i].x, pathPointsNow[i].y);
            }
            thisColor = getColorSegment(i);
            if (thisColor) {
            if (thisColor != lastColor) {
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.strokeStyle = thisColor;
                lastColor = thisColor;
            }
            }
        }
        ctx.closePath();
        ctx.stroke();
        }
        
        // fills paths array with all points of each form from PATH
        function samplePath(pathSelector) {
            
        var path = pathSelector;
        var length = path.getTotalLength();
        var points = [];
        for (var i = 0; i <= steps; i++) {
            points.push(path.getPointAtLength(length*i/steps));
        }
        
        return points;
        }
        
        function interpolatePaths() {
            
        var points = [];
        for (var i = 0; i <= steps; i++) {
            points.push({x: pathPointsFrom[i].x + (pathPointsTo[i].x-pathPointsFrom[i].x)*interpolationPoint.percentage, y: pathPointsFrom[i].y +(pathPointsTo[i].y-pathPointsFrom[i].y)*interpolationPoint.percentage});
        }
        
        return points;
        }
        
        function getColorSegment(i) {
            
        var p = i/steps + offset;
        if (p > 1) p = p-1;
        var point = Math.floor(p*4);
        return colors[point];
        }
        
        function loop() {
            
        ctx.clearRect(0, 0, 200, 200);
        offset = offset + 0.009;
        pathPointsNow = interpolatePaths();
        if (offset >= 1) offset = 0;
        drawPathToCanvas();
        requestAnimationFrame(loop);  
        }
        
        // transition from one form to another
        function tweenPaths() {
        pathPointsFrom = paths[pathCount];
        if (pathCount+1 <= 7) pathPointsTo = paths[pathCount+1];
        else pathPointsTo = paths[0];
        
        TweenLite.to(interpolationPoint, 0.7, {percentage: 1, delay: 0.4, onComplete: function() { // eslint-disable-line
            interpolationPoint.percentage = 0;
            
            pathCount++;
            if (pathCount > 7) {
            pathCount = 0;
            }
            tweenPaths();
        }});
        }
        
        tweenPaths();
        loop();
    }

    render() {
        return <section className="canvasLetters">
            <svg id="svg" width="200" height="200" viewBox="0 0 200 200">
                <path id="letter-w" d="M10,10 66,195 100,110 133,195 190,10" ref={(ref) => (this.letterW = ref)}/>
                <path id="letter-a" d="M10,190 58,90 100,10 140,90 190,190 140,90 58,90" ref={(ref) => (this.letterA = ref)}/>
                <path id="letter-t" d="M10,10 100,10 100,190 100,10 190,10" ref={(ref) => (this.letterT = ref)}/>
                <path id="letter-c" d="M 180 60 Q 160 10 100 10 Q 15 10 10 100 Q 15 185 100 190 Q 180 185 180 115" ref={(ref) => (this.letterC = ref)}/>
                <path id="letter-h" d="M 35 10 L 35 100 L 35 190 L 35 100 L 165 100 L 165 10 L 165 100 L 165 190" ref={(ref) => (this.letterH = ref)}/>
                <path id="letter-i" d="M 40 10 L 100 10 L 160 10 L 100 10 L 100 190 L 160 190 L 100 190 L 40 190" ref={(ref) => (this.letterI = ref)}/>
                <path id="letter-n" d="M 40 190 L 40 10 L 160 190 L 160 10" ref={(ref) => (this.letterN = ref)}/>
                <path id="letter-g" d="M 180 60 Q 160 10 100 10 Q 15 15 10 100 Q 15 185 100 190 Q 175 180 180 115 L 100 115" ref={(ref) => (this.letterG = ref)}/>
            </svg>
            <canvas id="canvas" width="200" height="200" ref={(ref) => (this.canvas = ref)}></canvas>
        </section>
    }
}

export default CanvasLetters

