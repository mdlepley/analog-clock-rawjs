var secondHand = document.getElementById('second-hand-container'),
  minuteHand = document.getElementById('minute-hand-container'),
  hourHand = document.getElementById('hour-hand-container'),
  secondDegrees = 6,
  hourDegrees = 30;

function tick() {
  var angle = getAngle('second-hand-container');
  secondHand.style.transform = 'rotate(' + (angle + secondDegrees) + 'deg)';
}

function getTime() {
  var d = new Date();
  return {
    seconds: d.getSeconds(),
    minutes: d.getMinutes(),
    hours: d.getHours()
  }
}

function setTime() {
  // set all initial angles
  var t = getTime();
  secondHand.style.transform = 'rotate(' + (t.seconds * secondDegrees) + 'deg)';
  minuteHand.style.transform = 'rotate(' + (t.minutes * secondDegrees) + 'deg)';
  hourHand.style.transform = 'rotate(' + (t.hours * hourDegrees) + 'deg)';
}

function setAngle(element, time) {

}

function getAngle(elementId) {
  var el = document.getElementById(elementId);
  var st = window.getComputedStyle(el, null);
  var tr = st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform") ||
    matrix(1, 0, 0, 1, 0, 0);

  // With rotate(30deg)...
  // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
  //console.log('Matrix: ' + tr);

  // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

  var values = tr.split('(')[1].split(')')[0].split(',');
  var a = values[0];
  var b = values[1];
  var c = values[2];
  var d = values[3];

  var scale = Math.sqrt(a * a + b * b);

  //console.log('Scale: ' + scale);

  // arc sin, convert from radians to degrees, round
  var sin = b / scale;
  var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

  //console.log('Rotate: ' + angle + 'deg');

  return angle;
}


setTime();
setInterval(tick, 1000); // second and minute hands
//setInterval(tock, 3600000); // hour hand
