var type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
    radius = '12em', //distance from center
    start = -90, //shift start from 0
    elements=document.querySelectorAll('li:not(:first-child)');
   
 
    numberOfElements = (type === 1) ?  elements.length : elements.length - 1, //adj for even distro of elements when not full circle
    slice = 360 * type / numberOfElements;

for (let i=0; i<elements.length;i++){
    rotate = slice * i + start,
    rotateReverse = rotate * -1;
    elements[i].style.transform= 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'

}