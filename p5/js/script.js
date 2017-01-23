'use strict';

var
  ctx, soundList, loadSound, playSound,
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
  if (!sound.data) {
    return;
  }
  bufferSource = ctx.createBufferSource();
  bufferSource.buffer = sound.data;
  bufferSource.connect(ctx.destination);
  bufferSource.start(0);
};
window.AudioContext = window.AudioContext || window.webkitAudioContext;
ctx = new AudioContext();
soundList = [
  {url: '../media/miss.mp3', data: null},
  {url: '../media/gun.mp3', data: null}
];
soundList.forEach(loadSound);

random = function(current, length) {
  var result;
  do {
    result = Math.floor(Math.random() * length);
  } while (result === current);
  return result;
};
onKeydown = function(e){
  if (String.fromCharCode(e.keyCode) === charList[index]) {
    playSound(soundList[1]);
    index = random(index, charList.length);
    elChar.textContent = charList[index];
    elCounter.textContent = parseInt(elCounter.textContent, 10) + 1;
  } else {
    playSound(soundList[0]);
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