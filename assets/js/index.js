
var colors = ["#ff69b4", "#000000"];
var millis = 208000;

var nextColor = (function () {
  var colorI = 0;
  return function () {
    var result = colors[colorI];
    colorI = (colorI + 1) % colors.length;
    return result;
  };
}());


var audioContext = new AudioContext();

var docPromise = App.getDocument();
var imgPromise = App.getImage('assets/img/alien.jpg'); 
var audPromise = App.getAudio('assets/music/speech.mp3', audioContext);


Promise.all([imgPromise, audPromise, docPromise]).then(function (values) {

  var imageElement = values[0];
  var audioSource  = values[1];
  var document     = values[2];

  // insert alien

  imageElement.style.top  = (window.innerHeight - 300) / 2
  imageElement.style.left = (window.innerWidth - 500) / 2
  imageElement.style.position = "absolute";

  document.body.appendChild(imageElement);

  // setup audio
  
  audioSource.connect(audioContext.destination);
  audioSource.start(0);

  // setup canvas

  var canvas = document.getElementById('bg');
  canvas.height = window.innerWidth;
  canvas.width = window.innerWidth;
  canvas.style.position = "absolute";

  var context = canvas.getContext("2d");

  setInterval(function () {
    context.fillStyle = nextColor(); 
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }, 1000 / 30);

}, function (error) {
  console.error(error);                                                      
});


