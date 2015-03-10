
(function (global) {

  if (typeof window.AudioContext === 'undefined') {
    window.AudioContext = 
      window.webkitAudioContext || 
      window.mozAudioContext    ||
      window.msAudioContext; 
  }

  global.getUrl = function (url, options) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          resolve(request);
        }
        else {
          reject(new Error(request.statusText));
        }
      };
      if (typeof options.responseType !== 'undefined') {
        request.responseType = options.responseType;
      }
      request.send();
    });
  };

  global.getImage = function (url) {
    return new Promise (function (resolve, reject) {
      var image = new Image(); 
      image.onload = function () { resolve(image); };
      image.onerror = function () { reject(new Error("failed to load "+url)); };
      image.src = url;
    });
  };

  global.getAudio = function (url, context) {
    return global.getUrl(url, {
      responseType: 'arraybuffer',        
    }).then(function (value) {
      return new Promise (function (resolve, reject) {
        context.decodeAudioData(value.response, function (buffer) {
          var source = context.createBufferSource();
          source.buffer = buffer;
          resolve(source);
        }, function (error) {
          reject(error);
        });
      });
    });
  };

  global.getDocument = function () {
    return new Promise(function (resolve, reject) {
      window.addEventListener('load', function () {
        resolve(document);
      });
    });
  };
  
}(App));

