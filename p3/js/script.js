'use strict';

var random, onKeydown, charList, index, elChar, elCounter;

random = function(current, length) {
  var result;
  do {
    result = Math.floor(Math.random() * length);
  } while (result === current);
  return result;
};
onKeydown = function(e){
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