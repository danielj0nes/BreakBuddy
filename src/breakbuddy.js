// Character customisation core functionality
const Store = require("electron-store");

const store = new Store();
const emoteRange = 4;
// Grab elements from the customisation page
let characterImage = document.getElementById("breakbuddy-main");
// Load presets
characterImage.src = store.get("characterPreset");
let totalBreakTime = store.get("breakTime");

function getCharacterName() {
    return characterImage.src.replace(/^.*[\\/]/, "");
}

function emoteCycle(range) {
    let characterName = getCharacterName();
    const characterSplit = characterName.split("_");
    let emoteNum = Number(characterSplit[8][5]);
    emoteNum = (emoteNum + 1) % range;
    characterImage.src = characterImage.src.replace(/emote[0-9]/, "emote" + emoteNum);
}

let intervalBreakTime = Math.floor(totalBreakTime / emoteRange) * 600;
let timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
