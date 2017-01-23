'use strict';

var
  ctx, sound, loadSound, playSound,
  random, onKeydown, charList, index, elChar, elCounter;

loadSound = function(sound) {
  var xml;
  xml = new XMLHttpRequest();
  xml.responseType = 'arraybuffer';
  xml.open('GET', sound.url, true);
  xml.onload = function() {
    ctx.decodeAudioData(
      xml.response,
      function(data) {
        sound.data = data;
      },
      function(e) {
        alert(e.err);
      }
    );
  };
  xml.send();
};
playSound = function(sound) {
  var bufferSource;
  bufferSource = ctx.createBufferSource();
  bufferSource.buffer = sound.data;
  bufferSource.connect(ctx.destination);
  bufferSource.start(0);
};
window.AudioContext = window.AudioContext || window.webkitAudioContext;
ctx = new AudioContext();
sound = {url: '../media/gun.mp3', data: null};
loadSound(sound);

random = function(current, length) {
  var result;
  do {
    result = Math.floor(Math.random() * length);
  } while (result === current);
  return result;
};
onKeydown = function(e){
  playSound(sound);
  if (String.fromCharCode(e.keyCode) === charList[index]) {
    index = random(index, charList.length);
    elChar.textContent = charList[index];
    elCounter.textContent = parseInt(elCounter.textContent, 10) + 1;
  } else {
    elCounter.textContent = 0;
  }
};
charList = ['R','T','Y','U','F','G','H','J','V','B','N','M'];
index = random('', charList.length);
elChar = document.getElementById('js-char');
elChar.textContent = charList[index];
elCounter = document.getElementById('js-counter');
elCounter.textContent = 0;
window.addEventListener('keydown', onKeydown);