'use strict';

var random, charList, index, elChar;

random = function(length) {
  return Math.floor(Math.random() * length);
};
charList = ['R','T','Y','U','F','G','H','J','V','B','N','M'];
index = random(charList.length);
elChar = document.getElementById('js-char');
elChar.textContent = charList[index];