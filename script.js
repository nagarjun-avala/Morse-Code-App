// script.js
const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  " ": "/",
};

const reverseMorseCodeMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([key, value]) => [value, key])
);

document.getElementById("encodeButton").addEventListener("click", () => {
  const text = document.getElementById("textInput").value.toUpperCase();
  const morse = text
    .split("")
    .map((char) => morseCodeMap[char] || "")
    .join(" ");
  document.getElementById("morseOutput").value = morse;
});

document.getElementById("decodeButton").addEventListener("click", () => {
  const morse = document.getElementById("morseOutput").value;
  const text = morse
    .split(" ")
    .map((code) => reverseMorseCodeMap[code] || "")
    .join("");
  document.getElementById("textInput").value = text;
});

document.getElementById("playMorse").addEventListener("click", () => {
  const morse = document.getElementById("morseOutput").value;
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  let time = audioContext.currentTime;

  morse.split("").forEach((symbol) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(600, time);

    if (symbol === ".") {
      oscillator.connect(audioContext.destination);
      oscillator.start(time);
      time += 0.1;
      oscillator.stop(time);
    } else if (symbol === "-") {
      oscillator.connect(audioContext.destination);
      oscillator.start(time);
      time += 0.3;
      oscillator.stop(time);
    } else if (symbol === " ") {
      time += 0.2;
    }
  });
});
